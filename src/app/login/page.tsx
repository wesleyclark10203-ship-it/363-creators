'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.ok && data.user) {
        if (data.user.role === 'SUPER_ADMIN' || data.user.role === 'ADMIN') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
        router.refresh()
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err: any) {
      setError('An error occurred during sign in.')
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Client & Admin Portal</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to manage projects, content approvals, and invoices.</p>
      </div>

      <Card className="p-8 space-y-6 shadow-2xl border-slate-200 dark:border-slate-800">
        {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. client@safari.co.ke"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={loading}>
            Sign In <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Don’t have a client account?{' '}
          <Link href="/register" className="text-sky-500 font-bold hover:underline">
            Register Here
          </Link>
        </div>
      </Card>
    </div>
  )
}
