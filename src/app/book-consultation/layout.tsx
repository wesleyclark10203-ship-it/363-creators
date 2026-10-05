import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Strategy Consultation | Free Growth Session',
  description:
    'Book a 1-on-1 digital strategy consultation with the 363 Creators team. Discover how strategic content, modern web design, and targeted ads can grow your business.',
  alternates: {
    canonical: 'https://363creators.co.ke/book-consultation',
  },
  openGraph: {
    title: 'Book a Strategy Consultation | 363 Creators',
    description:
      'Book a 1-on-1 strategy call with 363 Creators. We assess your digital presence and provide an actionable roadmap.',
    url: 'https://363creators.co.ke/book-consultation',
    type: 'website',
  },
}

export default function BookConsultationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
