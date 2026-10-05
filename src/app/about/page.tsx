import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ArrowRight, ShieldCheck, Target, Lightbulb, Users, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'About Us | 363 Creators Digital Agency Nairobi',
  description:
    'Learn about 363 Creators, our team, mission, and how we help East African and global businesses build measurable digital impact through websites, branding, and content.',
  alternates: {
    canonical: 'https://363creators.co.ke/about',
  },
  openGraph: {
    title: 'About 363 Creators | Digital Agency Nairobi',
    description:
      'Learn about 363 Creators, our mission, values, and how we grow businesses in Kenya and across East Africa.',
    url: 'https://363creators.co.ke/about',
    type: 'website',
  },
}

export default function AboutPage() {
  const values = [
    { icon: Target, title: 'Results Over Hype', desc: 'We measure success by client sales revenue, qualified leads, and measurable growth.' },
    { icon: Lightbulb, title: 'Relentless Innovation', desc: 'We combine cutting-edge technology like Next.js with modern creative storytelling.' },
    { icon: ShieldCheck, title: 'Radical Transparency', desc: 'Full client visibility through real-time portal post approvals and analytics reports.' },
    { icon: Users, title: 'Client Partnership', desc: 'We act as an extension of your internal team rather than a distant vendor.' },
  ]


  return (
    <div className="py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <Badge variant="cyan">Who We Are</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Turning Ideas Into <span className="gradient-text">Digital Impact</span>.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          363 Creators is a modern digital agency and client management platform based in Nairobi, Kenya. We don’t just create content—we build digital experiences that help businesses grow.
        </p>
      </div>

      {/* Story & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge variant="gold">Our Mission</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Bridging Creative Excellence & Business ROI
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded with a vision to eliminate generic agency templates and unmeasured ad spending, 363 Creators delivers structured, data-driven digital growth. We empower SMEs, hospitality, real estate, and corporate institutions to dominate their markets.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0" />
              <span>Full-spectrum social media management & short-form video reels</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0" />
              <span>Custom Next.js web applications with automated M-Pesa payments</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0" />
              <span>Transparent client portal for post approvals and live performance metrics</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
            alt="363 Creators Team Collaboration"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Core Principles</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">The standards that guide every project we execute.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <Card key={i} className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{v.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </Card>
            )
          })}
        </div>
      </div>



      {/* CTA */}
      <div className="text-center p-12 rounded-3xl bg-slate-900 text-white space-y-6">
        <h2 className="text-3xl font-bold">Ready to Partner With 363 Creators?</h2>
        <div className="flex justify-center gap-4">
          <Link href="/get-a-quote">
            <Button variant="gradient" size="lg">Get a Quote <ArrowRight className="h-4 w-4 ml-1" /></Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
