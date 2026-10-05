import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Digital Agency Nairobi',
  description:
    'Get in touch with 363 Creators in Nairobi, Kenya. Contact our team via WhatsApp, call, or email to discuss social media management, web development, and digital marketing campaigns.',
  alternates: {
    canonical: 'https://363creators.co.ke/contact',
  },
  openGraph: {
    title: 'Contact 363 Creators | Digital Agency Nairobi, Kenya',
    description:
      'Speak to our creative and digital growth experts in Nairobi. Fast response on WhatsApp and email.',
    url: 'https://363creators.co.ke/contact',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
