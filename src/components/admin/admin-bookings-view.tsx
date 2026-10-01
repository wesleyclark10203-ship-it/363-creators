'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, XCircle } from 'lucide-react'

export function AdminBookingsView({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = React.useState(initialBookings)

  const handleUpdate = async (bookingId: string, status: string) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status }),
      })

      if (res.ok) {
        setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, status } : b)))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {bookings.map((b) => (
        <Card key={b.id} className="p-6 bg-slate-900 border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-white">{b.name}</h3>
                <Badge variant={b.status === 'APPROVED' ? 'cyan' : b.status === 'PENDING' ? 'warning' : 'danger'}>
                  {b.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Company: {b.businessName || 'N/A'} | Service: {b.service}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={() => handleUpdate(b.id, 'APPROVED')} variant="gradient" size="sm" className="gap-1">
                <CheckCircle2 className="h-4 w-4" /> Approve Slot
              </Button>
              <Button onClick={() => handleUpdate(b.id, 'CANCELLED')} variant="danger" size="sm" className="gap-1">
                <XCircle className="h-4 w-4" /> Cancel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-sky-400" />
              <span>Date: {b.date}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>Time: {b.timeSlot} (EAT)</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>Contact: {b.email} ({b.phone})</span>
            </div>
          </div>

          {b.message && (
            <p className="text-xs text-slate-400 italic p-3 bg-slate-950 rounded-xl border border-slate-800">
              "{b.message}"
            </p>
          )}
        </Card>
      ))}
    </div>
  )
}
