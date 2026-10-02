'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { CheckCircle2, Save } from 'lucide-react'

export function AdminSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = React.useState({
    company_name: initialSettings.company_name || '363 Creators',
    company_tagline: initialSettings.company_tagline || 'We Create. We Manage. We Grow.',
    company_email: initialSettings.company_email || 'andalamorgan@gmail.com',
    company_phone: initialSettings.company_phone || '+254 707 311381',
    whatsapp_number: initialSettings.whatsapp_number || '254707311381',
    location_address: initialSettings.location_address || 'Nairobi, Kenya',
    social_instagram: initialSettings.social_instagram || 'https://www.instagram.com/363creators/?utm_source=ig_web_button_share_sheet',
    social_facebook: initialSettings.social_facebook || 'https://www.facebook.com/363creators.ke',
    social_linkedin: initialSettings.social_linkedin || 'https://linkedin.com/company/363creators',
    social_tiktok: initialSettings.social_tiktok || 'https://tiktok.com/@363creators',
    social_x: initialSettings.social_x || 'https://x.com/363creators',
    hero_title: initialSettings.hero_title || 'We Create. We Manage. We Grow.',
    hero_subtitle: initialSettings.hero_subtitle || '363 Creators helps businesses build powerful digital brands through social media management, websites, content and digital marketing.',
  })

  const [loading, setLoading] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSaved(false)

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save settings.')
      }
    } catch (err: any) {
      setError('An error occurred while saving settings.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 bg-slate-900 border-slate-800 space-y-8 max-w-4xl mx-auto">
      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Site settings updated successfully!
        </div>
      )}

      {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Contact Info */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white border-b border-slate-800 pb-2">Company Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Company Name" value={settings.company_name} onChange={(e) => handleChange('company_name', e.target.value)} />
            <Input label="Company Tagline" value={settings.company_tagline} onChange={(e) => handleChange('company_tagline', e.target.value)} />
            <Input label="Email Address" value={settings.company_email} onChange={(e) => handleChange('company_email', e.target.value)} />
            <Input label="Phone Number" value={settings.company_phone} onChange={(e) => handleChange('company_phone', e.target.value)} />
            <Input label="Configurable WhatsApp Number" value={settings.whatsapp_number} onChange={(e) => handleChange('whatsapp_number', e.target.value)} placeholder="254790671626" />
            <Input label="Physical Address / Location" value={settings.location_address} onChange={(e) => handleChange('location_address', e.target.value)} />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white border-b border-slate-800 pb-2">Social Media Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Instagram URL" value={settings.social_instagram} onChange={(e) => handleChange('social_instagram', e.target.value)} />
            <Input label="Facebook URL" value={settings.social_facebook} onChange={(e) => handleChange('social_facebook', e.target.value)} />
          </div>
        </div>

        {/* Hero Copy CMS */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-white border-b border-slate-800 pb-2">Homepage Hero Banner Copy</h3>
          <Input label="Hero Title" value={settings.hero_title} onChange={(e) => handleChange('hero_title', e.target.value)} />
          <Textarea label="Hero Subtitle" value={settings.hero_subtitle} onChange={(e) => handleChange('hero_subtitle', e.target.value)} />
        </div>

        <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={loading}>
          <Save className="h-4 w-4 mr-1" /> Save All Site Settings
        </Button>
      </form>
    </Card>
  )
}
