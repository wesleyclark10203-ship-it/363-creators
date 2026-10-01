import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { businessName, contactName, email, phone, whatsapp, services, projectDetails, budgetRange, timeline, extraInfo } = await req.json()

    if (!contactName || !email || !phone) {
      return NextResponse.json({ error: 'Contact name, email, and phone are required' }, { status: 400 })
    }

    const count = await db.quote.count()
    const referenceNo = `363-${Math.floor(1000 + Math.random() * 9000)}`

    const quote = await db.quote.create({
      data: {
        referenceNo,
        businessName: businessName || contactName,
        contactName,
        email,
        phone,
        whatsapp: whatsapp || phone,
        services: JSON.stringify(services || []),
        projectDetails: projectDetails || 'Custom quote submission',
        budgetRange: budgetRange || 'Not Specified',
        timeline: timeline || 'Standard',
        extraInfo: extraInfo || null,
        status: 'PENDING',
      },
    })

    // Also auto-create a lead for admin pipeline
    await db.lead.create({
      data: {
        referenceNo: `LEAD-${referenceNo}`,
        name: contactName,
        company: businessName,
        email,
        phone,
        serviceRequested: Array.isArray(services) ? services.join(', ') : 'Custom Package',
        budgetRange,
        projectDetails,
        source: 'Quote Form',
        status: 'NEW',
      },
    })

    return NextResponse.json({ success: true, referenceNo })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
