import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Quote | Custom Digital Packages',
  description:
    'Calculate pricing and request a tailored quote for Social Media Management, Website Development, SEO, Branding, and Digital Advertising from 363 Creators.',
  alternates: {
    canonical: 'https://363creators.co.ke/get-a-quote',
  },
  openGraph: {
    title: 'Get a Quote | 363 Creators Digital Agency',
    description:
      'Fast, transparent proposals tailored to your budget and business growth goals in East Africa and globally.',
    url: 'https://363creators.co.ke/get-a-quote',
    type: 'website',
  },
}

export default function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
