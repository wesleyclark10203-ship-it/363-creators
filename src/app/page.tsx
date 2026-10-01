import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Share2,
  Layout,
  TrendingUp,
  Palette,
  Video,
  Search,
  Target,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export const revalidate = 3600

export default async function HomePage() {
  // Fetch dynamic database data with explicit column selection for speed
  const services = await db.service.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      icon: true,
      shortDesc: true,
      features: true,
    },
    orderBy: { order: 'asc' },
    take: 8,
  })

  const iconMap: Record<string, any> = {
    Share2,
    Layout,
    TrendingUp,
    Palette,
    Video,
    Search,
    Target,
    BarChart3,
  }

  const workProcess = [
    { step: '01', title: 'Discover', desc: 'Deep dive into your business goals, target market in East Africa, competitors, and brand voice.' },
    { step: '02', title: 'Plan', desc: 'Craft a customized digital strategy, content pillar framework, ad funnel, and tech architecture.' },
    { step: '03', title: 'Create', desc: 'Design high-converting websites, studio-grade video reels, graphics, and ad copy.' },
    { step: '04', title: 'Launch', desc: 'Deploy web apps, publish content via the 363 approval portal, and launch live ad campaigns.' },
    { step: '05', title: 'Analyze & Improve', desc: 'Continuous performance tracking, CRO tweaks, and detailed monthly ROI reporting.' },
  ]

  const whyUsPoints = [
    { title: 'Creative Strategy', desc: 'We craft unique, brand-aligned concepts that capture immediate audience attention.' },
    { title: 'Data-Driven Decisions', desc: 'Every ad campaign and post strategy is backed by empirical analytics.' },
    { title: 'Professional Execution', desc: 'Sub-second web performance, studio-grade video, and error-free copy.' },
    { title: 'Transparent Communication', desc: 'Real-time project tracking and post approval through your 363 Client Portal.' },
    { title: 'Client Collaboration', desc: 'Your input matters—1-click post approvals and direct team messaging.' },
    { title: 'Measurable Results', desc: 'We focus on leads, sales revenue, and conversion rate over vanity metrics.' },
    { title: 'Customized Solutions', desc: 'No generic cookie-cutter templates—everything is tailored to your business.' },
    { title: 'Long-term Partnerships', desc: 'We act as your dedicated internal digital department for continuous growth.' },
  ]

  return (
    <div className="flex flex-col space-y-24 pb-20 pt-24 overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pt-8 lg:pt-16 text-center">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-sky-500/20 via-cyan-400/20 to-amber-500/20 blur-3xl pointer-events-none rounded-full" />

        <div className="space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> East Africa’s Premier Digital Growth Agency
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl">
            We Create. <span className="gradient-text">We Manage.</span> We Grow.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            363 Creators helps businesses build powerful digital brands through strategic social media management, modern custom websites, viral video content, and high-ROI digital marketing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <Link href="/get-a-quote" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto px-8">
                Get Started <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Quick Feature Badges */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-8 sm:gap-16 text-center w-full max-w-2xl">
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">120+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Brands Scaled</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">350+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Projects Delivered</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white">4.9/5★</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: SERVICES */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Core Capabilities</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Full-Spectrum Digital Services Designed to Scale Your Business
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            From viral social media management to custom web development and high-ROI ad funnels, we provide end-to-end digital execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Share2
            const features = JSON.parse(service.features || '[]').slice(0, 3)

            return (
              <Card
                key={service.id}
                className="group hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <CardHeader className="space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-sky-500 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {service.shortDesc}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <ul className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/services/${service.slug}`} className="block pt-2">
                    <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-sky-500">
                      Learn More <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: WHY 363 CREATORS */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-slate-900 dark:bg-[#0B0F17] text-white py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="gold">Why Choose Us</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Built Different. Built For Growth.
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              We combine elite creative storytelling with modern software engineering and transparent client management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUsPoints.map((point, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-lg text-white">{point.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: HOW WE WORK (5-STEP PROCESS) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-slate-100 dark:bg-[#0E1524] py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="gold">Our Proven Methodology</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              5 Steps to Digital Impact
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
              A structured, transparent process built for speed, quality, and measurable business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {workProcess.map((item, idx) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 space-y-3 relative group hover:scale-105 transition-transform"
              >
                <span className="text-4xl font-black gradient-text opacity-40">{item.step}</span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 10: HIGH CONVERTING CTA */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-600 to-amber-500 p-10 sm:p-16 text-white text-center shadow-2xl shadow-cyan-500/20">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to grow your digital presence?
            </h2>
            <p className="text-base sm:text-lg text-sky-100 font-medium">
              We don’t just create content. We build digital experiences that help businesses grow. Talk to our team today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/get-a-quote">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100 font-bold w-full sm:w-auto">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/book-consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
