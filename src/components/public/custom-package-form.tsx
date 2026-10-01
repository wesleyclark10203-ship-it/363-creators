'use client'

import * as React from 'react'
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function CustomPackageForm() {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([])
  const [budget, setBudget] = React.useState('KSh 50,000–100,000')
  const [timeline, setTimeline] = React.useState('1 Month')
  const [businessName, setBusinessName] = React.useState('')
  const [contactName, setContactName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [details, setDetails] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null)
  const [error, setError] = React.useState('')

  const availableServices = [
    { id: 'Social Media', label: 'Social Media Management' },
    { id: 'Website', label: 'Website Design & Development' },
    { id: 'Digital Marketing', label: 'Digital Marketing & Paid Ads' },
    { id: 'Branding', label: 'Branding & Creative Design' },
    { id: 'Content', label: 'Content Creation & Video Reels' },
    { id: 'SEO', label: 'Search Engine Optimization (SEO)' },
    { id: 'Advertising', label: 'Digital Advertising & Retargeting' },
  ]

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id))
    } else {
      setSelectedServices([...selectedServices, id])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !email || !phone) {
      setError('Please fill in your name, email, and phone number.')
      return
    }
    if (selectedServices.length === 0) {
      setError('Please select at least one service.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName || contactName,
          contactName,
          email,
          phone,
          services: selectedServices,
          projectDetails: details || 'Custom package submission',
          budgetRange: budget,
          timeline,
        }),
      })

      const data = await res.json()
      if (res.ok && data.referenceNo) {
        setSubmittedRef(data.referenceNo)
      } else {
        setError(data.error || 'Failed to submit quote request.')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submittedRef) {
    return (
      <Card className="p-10 text-center space-y-4 max-w-2xl mx-auto bg-slate-900 text-white border-sky-500">
        <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-3xl font-bold">Custom Package Request Received!</h3>
        <p className="text-slate-300 text-sm">
          Thank you <span className="font-bold text-white">{contactName}</span>. Our growth team is reviewing your requirements and will reach out within 2 hours.
        </p>
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 font-mono text-amber-400 font-bold text-lg">
          Reference: {submittedRef}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 sm:p-12 space-y-8 max-w-4xl mx-auto border-2 border-sky-500/30">
      <div className="text-center space-y-2">
        <Badge variant="cyan" className="inline-flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Interactive Calculator
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Build Your Custom Package</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Select the exact services you need and receive a tailored proposal.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">{error}</div>}

        {/* 1. Select Services */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            1. Select Required Services
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableServices.map((service) => {
              const isSelected = selectedServices.includes(service.id)
              return (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-3.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <span>{service.label}</span>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-sky-500" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Budget & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Select
            label="2. Estimated Monthly Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            options={[
              { label: 'Under KSh 20,000', value: 'Under KSh 20,000' },
              { label: 'KSh 20,000–50,000', value: 'KSh 20,000–50,000' },
              { label: 'KSh 50,000–100,000', value: 'KSh 50,000–100,000' },
              { label: 'KSh 100,000+', value: 'KSh 100,000+' },
            ]}
          />
          <Select
            label="3. Expected Timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            options={[
              { label: 'Immediate (1-2 weeks)', value: '1-2 Weeks' },
              { label: 'Standard (1 Month)', value: '1 Month' },
              { label: 'Long-term Retainer (3+ Months)', value: '3+ Months' },
            ]}
          />
        </div>

        {/* 3. Business Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="Business / Company Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Safari Trails EA" />
          <Input label="Your Name *" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="e.g. David Kimani" required />
          <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. david@safari.co.ke" required />
          <Input label="Phone / WhatsApp *" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +254 712 345678" required />
        </div>

        <Textarea label="Project Details & Specific Goals" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Describe your product, target audience, and primary goals..." />

        <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={loading}>
          Submit Custom Package Request <ArrowRight className="h-5 w-5 ml-1" />
        </Button>
      </form>
    </Card>
  )
}
