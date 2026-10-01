import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('[M-PESA CALLBACK RECEIVED]', JSON.stringify(body))

    const stkCallback = body?.Body?.stkCallback
    if (!stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid Payload' }, { status: 400 })
    }

    const checkoutRequestID = stkCallback.CheckoutRequestID
    const resultCode = stkCallback.ResultCode

    if (resultCode === 0) {
      // Payment Successful
      const items = stkCallback.CallbackMetadata?.Item || []
      const mpesaReceipt = items.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value || `MPESA-${Date.now()}`
      const amount = items.find((i: any) => i.Name === 'Amount')?.Value || 0

      // Find pending payment
      const payment = await db.payment.findFirst({
        where: { referenceNo: checkoutRequestID },
        include: { invoice: true },
      })

      if (payment) {
        await db.payment.update({
          where: { id: payment.id },
          data: {
            status: 'COMPLETED',
            referenceNo: mpesaReceipt,
            rawPayload: JSON.stringify(body),
          },
        })

        const newPaid = payment.invoice.amountPaid + amount
        const newBalance = Math.max(0, payment.invoice.total - newPaid)

        await db.invoice.update({
          where: { id: payment.invoiceId },
          data: {
            amountPaid: newPaid,
            balance: newBalance,
            status: newBalance === 0 ? 'PAID' : 'PARTIALLY_PAID',
          },
        })
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (error: any) {
    console.error('M-Pesa Callback Processing Error:', error)
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Internal Error' }, { status: 500 })
  }
}
