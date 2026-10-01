'use client'

import * as React from 'react'
import { Calendar as CalendarIcon, Clock, CheckCircle2, ArrowRight, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function BookConsultationPage() {
  const [service, setService] = React.useState('Social Media Management')
  const [date, setDate] = React.useState('2026-10-10')
  const [timeSlot, setTimeSlot] = React.useState('10:00 AM - 11:00 AM')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [businessName, setBusinessName] = React.useState('')
  const [message, setMessage] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState('')

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !date || !timeSlot) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          date,
          timeSlot,
          name,
          email,
          phone,
          businessName,
          message,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to book consultation.')
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 pt-8">
        <Badge variant="cyan" className="inline-flex items-center gap-1">
          <Globe className="h-3 w-3" /> Timezone: Africa/Nairobi (EAT)
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Book a 1-on-1 Growth Consultation
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Schedule a 45-minute strategy call with our digital agency directors to audit your brand and growth goals.
        </p>
      </div>

      <Card className="p-8 sm:p-12 border-2 border-sky-500/20 shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-6">
            <div className="h-20 w-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Consultation Booking Requested!</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Thank you <span className="font-bold text-slate-900 dark:text-white">{name}</span>. We’ve reserved your slot for <span className="font-bold text-sky-500">{date} at {timeSlot}</span> (Africa/Nairobi). A calendar invite link has been emailed to {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">{error}</div>}

            {/* Service & Slot Picker */}
            <div className="space-y-6">
              <Select
                label="Select Service Focus *"
                value={service}
                onChange={(e) => setService(e.target.value)}
                options={[
                  { label: 'Social Media Management', value: 'Social Media Management' },
                  { label: 'Website Design & Development', value: 'Website Design & Development' },
                  { label: 'Digital Marketing & Ads', value: 'Digital Marketing & Ads' },
                  { label: 'Branding & Identity', value: 'Branding & Identity' },
                  { label: 'Content Creation & Video Reels', value: 'Content Creation & Video Reels' },
                  { label: 'SEO & Organic Growth', value: 'SEO & Organic Growth' },
                ]}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Select Consultation Date *"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Available Time Slot (EAT) *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                          timeSlot === slot
                            ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Your Contact Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input label="Your Name *" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <Input label="Business / Company Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>

              <Textarea label="What would you like to achieve in this call?" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Provide any background details or specific questions..." />
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={loading}>
              Confirm Consultation Booking <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
