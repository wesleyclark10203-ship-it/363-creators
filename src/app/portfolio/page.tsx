import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Portfolio & Case Studies | 363 Creators Digital Agency',
  description:
    'Explore client case studies, website builds, branding design, and social media growth campaigns by 363 Creators in East Africa.',
  alternates: {
    canonical: 'https://363creators.co.ke/portfolio',
  },
  openGraph: {
    title: 'Featured Portfolio | 363 Creators',
    description:
      'Explore client case studies, website designs, and viral growth campaigns delivered by 363 Creators.',
    url: 'https://363creators.co.ke/portfolio',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <Badge variant="cyan">Case Studies & Work</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Featured <span className="gradient-text">Portfolio</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Discover how we've helped businesses in hospitality, real estate, e-commerce, and professional services build a powerful digital presence.
        </p>
      </div>
    </div>
  )
}