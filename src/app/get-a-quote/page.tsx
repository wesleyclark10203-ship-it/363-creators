'use client'

import * as React from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Building, Briefcase, DollarSign, Calendar, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function GetAQuotePage() {
  const [step, setStep] = React.useState(1)

  // Form State
  const [contactName, setContactName] = React.useState('')
  const [companyName, setCompanyName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [whatsapp, setWhatsapp] = React.useState('')

  const [selectedServices, setSelectedServices] = React.useState<string[]>([])
  const [projectDetails, setProjectDetails] = React.useState('')
  const [budgetRange, setBudgetRange] = React.useState('KSh 50,000–100,000')
  const [timeline, setTimeline] = React.useState('1 Month')
  const [extraInfo, setExtraInfo] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [referenceNo, setReferenceNo] = React.useState<string | null>(null)
  const [error, setError] = React.useState('')

  const availableServices = [
    'Social Media Management',
    'Website Design & Development',
    'Digital Marketing & Ads',
    'Branding & Creative Design',
    'Content Creation & Video',
    'Search Engine Optimization (SEO)',
    'Digital Advertising',
    'Analytics & Reporting',
  ]

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv))
    } else {
      setSelectedServices([...selectedServices, srv])
    }
  }

  const handleNext = () => {
    if (step === 1 && (!contactName || !email || !phone)) {
      setError('Please fill in your name, email, and phone number.')
      return
    }
    if (step === 2 && selectedServices.length === 0) {
      setError('Please select at least one service.')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const handleBack = () => {
    setError('')
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: companyName || contactName,
          contactName,
          email,
          phone,
          whatsapp: whatsapp || phone,
          services: selectedServices,
          projectDetails: projectDetails || 'No details specified',
          budgetRange,
          timeline,
          extraInfo,
        }),
      })

      const data = await res.json()
      if (res.ok && data.referenceNo) {
        setReferenceNo(data.referenceNo)
        setStep(7)
      } else {
        setError(data.error || 'Failed to generate quote.')
      }
    } catch (err: any) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <Badge variant="cyan">Multi-Step Quote Generator</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Request a Custom Proposal
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Complete the quick steps below and receive a detailed strategy deck & pricing quote.
        </p>

        {/* Progress Bar */}
        {step < 7 && (
          <div className="max-w-md mx-auto pt-4 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Step 0{step} of 06</span>
              <span>{Math.round((step / 6) * 100)}% Completed</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-amber-500 transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <Card className="p-8 sm:p-12 border-2 border-sky-500/20 shadow-2xl">
        {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs mb-6">{error}</div>}

        {/* STEP 1: BUSINESS INFORMATION */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Step 1: Business Information</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tell us about you and your organization.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Your Name *" value={contactName} onChange={(e) => setContactName(e.target.value)} required placeholder="e.g. David Kimani" />
              <Input label="Company / Brand Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Safari Trails EA" />
              <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="e.g. david@safari.co.ke" />
              <Input label="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="e.g. +254 712 345678" />
              <Input label="WhatsApp Number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="e.g. +254 712 345678" />
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleNext} variant="gradient">
                Next: Services <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: SERVICES REQUIRED */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Step 2: Services Required</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select all services you would like included in your quote.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableServices.map((srv) => {
                const isSelected = selectedServices.includes(srv)
                return (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => toggleService(srv)}
                    className={`p-4 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-500/15 border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span>{srv}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-sky-500" />}
                  </button>
                )
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <Button onClick={handleBack} variant="outline"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button onClick={handleNext} variant="gradient">Next: Details <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </div>
        )}

        {/* STEP 3: PROJECT DETAILS */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Step 3: Project Details</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Describe your project objectives, target audience, and current challenges.</p>
            </div>

            <Textarea
              label="Project Scope & Objectives"
              rows={5}
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="e.g. We want to relaunch our company website, shoot monthly TikTok reels, and run Google Search ads..."
            />

            <div className="pt-4 flex justify-between">
              <Button onClick={handleBack} variant="outline"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button onClick={handleNext} variant="gradient">Next: Budget <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Step 4: Estimated Budget</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select your anticipated budget range.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Under KSh 20,000',
                'KSh 20,000–50,000',
                'KSh 50,000–100,000',
                'KSh 100,000+',
              ].map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBudgetRange(b)}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    budgetRange === b
                      ? 'bg-sky-500/15 border-sky-500 text-sky-600 dark:text-sky-400 font-bold text-base'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <Button onClick={handleBack} variant="outline"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button onClick={handleNext} variant="gradient">Next: Timeline <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </div>
        )}

        {/* STEP 5: TIMELINE */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Step 5: Expected Timeline</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">When do you plan to start or launch?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Urgent (1-2 Weeks)', 'Standard (1 Month)', 'Flexible (2-3 Months)'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTimeline(t)}
                  className={`p-5 rounded-2xl border text-center transition-all ${
                    timeline === t
                      ? 'bg-sky-500/15 border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <Button onClick={handleBack} variant="outline"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button onClick={handleNext} variant="gradient">Next: Summary <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </div>
        )}

        {/* STEP 6: ADDITIONAL INFORMATION & CONFIRMATION */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Step 6: Review & Submit</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Review your submission details before generating reference.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl space-y-3 text-xs border border-slate-200 dark:border-slate-800">
              <p><span className="font-bold text-slate-400 uppercase">Contact:</span> {contactName} ({email}, {phone})</p>
              <p><span className="font-bold text-slate-400 uppercase">Company:</span> {companyName || 'N/A'}</p>
              <p><span className="font-bold text-slate-400 uppercase">Services:</span> {selectedServices.join(', ')}</p>
              <p><span className="font-bold text-slate-400 uppercase">Budget:</span> {budgetRange}</p>
              <p><span className="font-bold text-slate-400 uppercase">Timeline:</span> {timeline}</p>
            </div>

            <Textarea
              label="Additional Notes / Competitors / Links"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder="Any additional details or links to existing website/socials..."
            />

            <div className="pt-4 flex justify-between">
              <Button onClick={handleBack} variant="outline"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
              <Button onClick={handleSubmit} variant="gradient" isLoading={loading}>
                Submit Request & Generate Reference <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 7: SUCCESS CONFIRMATION */}
        {step === 7 && referenceNo && (
          <div className="text-center py-10 space-y-6">
            <div className="h-20 w-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Thank You! Your Request Has Been Received.</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
                A confirmation email has been dispatched to <span className="font-bold text-slate-900 dark:text-white">{email}</span>.
              </p>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-2xl max-w-md mx-auto border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-widest">Lead Reference Number</p>
              <p className="text-3xl font-extrabold text-amber-400 font-mono">Reference: {referenceNo}</p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <Button onClick={() => setStep(1)} variant="outline">Submit Another Request</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
