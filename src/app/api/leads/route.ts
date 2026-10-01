import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ leads })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, company, email, phone, serviceRequested, budgetRange, projectDetails, source } = await req.json()

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 })
    }

    const count = await db.lead.count()
    const referenceNo = `LEAD-${1000 + count + 1}`

    const lead = await db.lead.create({
      data: {
        referenceNo,
        name,
        company: company || null,
        email,
        phone,
        serviceRequested: serviceRequested || 'General Inquiry',
        budgetRange: budgetRange || 'Not Specified',
        projectDetails: projectDetails || null,
        source: source || 'Website Form',
        status: 'NEW',
      },
    })

    return NextResponse.json({ success: true, lead })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { leadId, status } = await req.json()

    if (!leadId || !status) {
      return NextResponse.json({ error: 'Lead ID and status are required' }, { status: 400 })
    }

    const lead = await db.lead.update({
      where: { id: leadId },
      data: { status },
    })

    return NextResponse.json({ success: true, lead })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
