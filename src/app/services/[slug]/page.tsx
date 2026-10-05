import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { CheckCircle2, ArrowRight, HelpCircle, ShieldCheck, Zap, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await db.service.findUnique({ where: { slug: params.slug } })
  if (!service) return {}
  const canonicalUrl = `https://363creators.co.ke/services/${service.slug}`
  return {
    title: `${service.title} | 363 Creators Digital Agency Nairobi`,
    description: service.shortDesc || service.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} | 363 Creators Digital Agency`,
      description: service.shortDesc || service.description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: 'https://363creators.co.ke/og-image.jpg',
          width: 1024,
          height: 1024,
          alt: `${service.title} - 363 Creators`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | 363 Creators`,
      description: service.shortDesc || service.description,
      images: ['https://363creators.co.ke/og-image.jpg'],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await db.service.findUnique({ where: { slug: params.slug } })

  if (!service) {
    notFound()
  }

  const otherServices = await db.service.findMany({
    where: { slug: { not: params.slug } },
    select: { title: true, slug: true, shortDesc: true, category: true },
    take: 3,
  })

  const features = JSON.parse(service.features || '[]')
  const benefits = JSON.parse(service.benefits || '[]')
  const deliverables = JSON.parse(service.deliverables || '[]')
  const processSteps = JSON.parse(service.process || '[]')
  const faqs = JSON.parse(service.faqs || '[]')

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://363creators.co.ke',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://363creators.co.ke/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://363creators.co.ke/services/${service.slug}`,
      },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDesc || service.description,
    provider: {
      '@type': 'Organization',
      name: '363 Creators',
      url: 'https://363creators.co.ke',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
  }

  return (
    <div className="py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-4 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-slate-900 dark:hover:text-white transition-colors">Services</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">{service.title}</span>
      </nav>

      {/* Service Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-2">
        <Badge variant="cyan">{service.category}</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {service.title}
        </h1>
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
          {service.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/get-a-quote">
            <Button variant="gradient" size="lg">
              Get Started with {service.title} <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
          <Link href="/book-consultation">
            <Button variant="outline" size="lg">
              Book Free Strategy Call
            </Button>
          </Link>
        </div>
      </div>

      {/* Features & Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Features Included */}
        <Card className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is Included</h2>
          </div>
          <ul className="space-y-3">
            {features.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Key Deliverables */}
        <Card className="p-8 space-y-6 bg-slate-900 text-white border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Your Tangible Deliverables</h2>
          </div>
          <ul className="space-y-3">
            {deliverables.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Benefits */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="gold">Business Value</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            Why Invest in {service.title}?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b: string, idx: number) => (
            <Card key={idx} className="p-6 space-y-3 border-l-4 border-l-sky-500">
              <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">Benefit 0{idx + 1}</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">{b}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Process */}
      {processSteps.length > 0 && (
        <div className="bg-slate-100 dark:bg-[#0E1524] p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="cyan">Execution Path</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How We Execute</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step: string, idx: number) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-2xl font-black text-sky-500">0{idx + 1}</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="h-7 w-7 text-sky-500" /> Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq: { q: string; a: string }, idx: number) => (
              <Card key={idx} className="p-6 space-y-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Q: {faq.q}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">A: {faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Related Services Internal Links */}
      {otherServices.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Other Services</h2>
              <p className="text-sm text-slate-500">Comprehensive digital solutions to complement your growth.</p>
            </div>
            <Link href="/services" className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Card key={s.slug} className="p-5 space-y-3 hover:border-sky-500/40 transition-colors">
                <Badge variant="cyan" className="text-[10px]">{s.category}</Badge>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  <Link href={`/services/${s.slug}`} className="hover:text-sky-500 transition-colors">
                    {s.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{s.shortDesc}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400 pt-1 hover:underline"
                >
                  Learn more <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="p-12 rounded-3xl bg-gradient-to-r from-sky-600 via-cyan-600 to-amber-500 text-white text-center space-y-6 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-black">Ready to scale your business with {service.title}?</h2>
        <div className="flex justify-center gap-4">
          <Link href="/get-a-quote">
            <Button size="lg" className="bg-white text-slate-950 font-bold hover:bg-slate-100">
              Get Started <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
