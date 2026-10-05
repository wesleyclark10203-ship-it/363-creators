import Link from 'next/link'
import { Share2, Layout, TrendingUp, Palette, Video, Search, Target, CheckCircle2, ArrowRight } from 'lucide-react'
import { db } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Our Digital Services | 363 Creators Digital Agency',
  description:
    'Explore our complete suite of digital services in Nairobi, Kenya: Social Media Management, Website Development, Digital Marketing, Branding, Content Creation, and SEO.',
  alternates: {
    canonical: 'https://363creators.co.ke/services',
  },
  openGraph: {
    title: 'Our Digital Services | 363 Creators',
    description:
      'High-impact social media management, website development, SEO, and paid performance funnels in Kenya.',
    url: 'https://363creators.co.ke/services',
    type: 'website',
  },
}

export const revalidate = 60

export default async function ServicesPage() {
  const services = await db.service.findMany({ orderBy: { order: 'asc' } })

  const iconMap: Record<string, any> = {
    Share2,
    Layout,
    TrendingUp,
    Palette,
    Video,
    Search,
    Target,
  }

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <Badge variant="cyan">Agency Capabilities</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Services That Drive <span className="gradient-text">Measurable Growth</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          We combine creative excellence with technical innovation to build digital channels that acquire customers predictably.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Share2
          const features = JSON.parse(service.features || '[]')

          return (
            <Card key={service.id} className="p-6 space-y-6 group hover:border-sky-500/50 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Features</p>
                  <ul className="space-y-1.5">
                    {features.map((f: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href={`/services/${service.slug}`} className="block pt-4">
                <Button variant="outline" className="w-full justify-between">
                  View Service Details <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
