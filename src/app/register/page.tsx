'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function RegisterPage() {
  const [name, setName] = React.useState('')
  const [companyName, setCompanyName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, companyName, email, phone, password }),
      })

      const data = await res.json()
      if (res.ok && data.user) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError(data.error || 'Registration failed.')
      }
    } catch (err: any) {
      setError('An error occurred during registration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-20 max-w-md mx-auto px-4 space-y-8">
      <div className="text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-amber-400 p-0.5">
            <div className="h-full w-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center font-bold text-white text-base">
              363
            </div>
          </div>
          <span className="font-extrabold text-2xl text-slate-900 dark:text-white">
            363 <span className="gradient-text font-black">CREATORS</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Client Account</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Join the 363 Creators platform to manage your agency projects.</p>
      </div>

      <Card className="p-8 space-y-6 shadow-2xl border-slate-200 dark:border-slate-800">
        {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <Input label="Your Name *" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. David Kimani" />
          <Input label="Company Name *" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required placeholder="e.g. Safari Trails EA" />
          <Input label="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="e.g. david@safari.co.ke" />
          <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +254 712 345678" />
          <Input label="Password *" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Minimum 6 characters" />

          <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={loading}>
            Create Account <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-sky-500 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </Card>
    </div>
  )
}
