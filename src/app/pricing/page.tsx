import Link from 'next/link'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CustomPackageForm } from '@/components/public/custom-package-form'

export const metadata = {
  title: 'Pricing & Packages | 363 Creators',
  description: 'Transparent pricing packages and custom service calculator for 363 Creators digital agency services.',
}

export const revalidate = 60

export default async function PricingPage() {
  redirect('/get-a-quote')

  const plans = await db.pricingPlan.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <Badge variant="gold">Simple & Transparent</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pricing Built for <span className="gradient-text-gold">Scale</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Choose a monthly growth package or build a tailored custom solution for your specific business goals.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const features = JSON.parse(plan.features || '[]')

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-slate-900 text-white border-amber-500/80 shadow-2xl shadow-amber-500/10 scale-105'
                  : 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 min-h-[36px]">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1 border-b border-slate-200 dark:border-slate-800 pb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/{plan.billingFrequency}</span>
                </div>

                <ul className="space-y-3 text-xs">
                  {features.map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/get-a-quote" className="block pt-8">
                <Button variant={plan.isPopular ? 'gradient' : 'outline'} className="w-full">
                  {plan.ctaText}
                </Button>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Build Your Custom Package Form */}
      <div id="custom" className="pt-12 scroll-mt-24">
        <CustomPackageForm />
      </div>
    </div>
  )
}
