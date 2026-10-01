import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const bookings = await db.consultation.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ bookings })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { service, date, timeSlot, name, email, phone, businessName, message } = await req.json()

    if (!name || !email || !phone || !date || !timeSlot) {
      return NextResponse.json({ error: 'All required booking fields must be filled' }, { status: 400 })
    }

    const booking = await db.consultation.create({
      data: {
        service,
        date,
        timeSlot,
        name,
        email,
        phone,
        businessName: businessName || null,
        message: message || null,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ success: true, booking })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { bookingId, status, notes } = await req.json()

    if (!bookingId || !status) {
      return NextResponse.json({ error: 'Booking ID and status are required' }, { status: 400 })
    }

    const booking = await db.consultation.update({
      where: { id: bookingId },
      data: { status, notes },
    })

    return NextResponse.json({ success: true, booking })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
