'use client'

import * as React from 'react'
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function ContactPage() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setError('Please fill in your name, email, and message.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          serviceRequested: subject || 'General Inquiry',
          projectDetails: message,
          source: 'Contact Page',
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit inquiry.')
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254707311381'

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <Badge variant="cyan">Get In Touch</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Let’s Build Something <span className="gradient-text">Great</span> Together
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Have a project in mind or want to discuss a customized digital campaign? Reach out to our team in Nairobi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="p-8 space-y-6 bg-slate-900 text-white border-slate-800">
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <p className="text-xs text-slate-400">Our agency team responds to all inquiries within 2 business hours.</p>

            <div className="space-y-4 pt-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Location</p>
                  <p className="text-xs text-slate-400">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Email Us</p>
                  <a href="mailto:andalamorgan@gmail.com" className="text-xs text-slate-400 hover:text-white">andalamorgan@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Call Us</p>
                  <a href="tel:+254707311381" className="text-xs text-slate-400 hover:text-white">0707 311 381</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">WhatsApp Support</p>
                  <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline">Chat on WhatsApp (0707 311 381)</a>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-8 sm:p-10 space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-16 w-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
                <p className="text-slate-500 text-sm">Thank you {name}. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send Us a Message</h3>

                {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input label="Your Name *" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Input label="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>

                <Input label="Subject / Service" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Website Design & Social Media" />
                <Textarea label="Your Message *" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your project requirements..." required />

                <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={loading}>
                  Send Message <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
