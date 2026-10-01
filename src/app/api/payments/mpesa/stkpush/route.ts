import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireClient } from '@/lib/auth'
import { initiateMpesaSTKPush } from '@/lib/payments/mpesa'

export async function POST(req: Request) {
  try {
    const user = await requireClient()
    const { invoiceId, phoneNumber } = await req.json()

    if (!invoiceId || !phoneNumber) {
      return NextResponse.json({ error: 'Invoice ID and phone number are required' }, { status: 400 })
    }

    const invoice = await db.invoice.findUnique({
      where: { id: invoiceId },
    })

    if (!invoice || invoice.clientProfileId !== user.clientProfileId) {
      return NextResponse.json({ error: 'Invoice not found or unauthorized' }, { status: 404 })
    }

    const stkResult = await initiateMpesaSTKPush({
      phoneNumber,
      amount: Math.round(invoice.balance),
      accountReference: invoice.invoiceNumber,
      transactionDesc: `363 Creators Invoice ${invoice.invoiceNumber}`,
    })

    if (stkResult.success) {
      // Record pending payment in DB
      await db.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: invoice.balance,
          paymentMethod: 'MPESA',
          referenceNo: stkResult.checkoutRequestID || `STK-${Date.now()}`,
          mpesaPhone: phoneNumber,
          status: stkResult.isMock ? 'COMPLETED' : 'PENDING',
        },
      })

      // If mock simulation, automatically mark invoice as PAID for instant local verification!
      if (stkResult.isMock) {
        await db.invoice.update({
          where: { id: invoice.id },
          data: {
            amountPaid: invoice.total,
            balance: 0,
            status: 'PAID',
          },
        })
      }

      return NextResponse.json({
        success: true,
        message: stkResult.customerMessage,
        isMock: stkResult.isMock,
      })
    } else {
      return NextResponse.json({ error: stkResult.error }, { status: 400 })
    }
  } catch (error: any) {
    console.error('M-Pesa STK Push Route Error:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
