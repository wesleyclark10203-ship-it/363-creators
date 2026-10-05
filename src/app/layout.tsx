import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://363creators.co.ke'),
  title: '363 Creators | Digital Agency - We Create. We Manage. We Grow.',
  description:
    '363 Creators is a premium digital agency providing Social Media Management, Website Design & Development, Digital Marketing, Branding, Content Creation, and SEO across Kenya, East Africa, and globally.',
  keywords: [
    'Digital Agency Kenya',
    '363 Creators',
    'Social Media Management Nairobi',
    'Website Development Kenya',
    'Digital Marketing East Africa',
    'Branding Agency Nairobi',
    'SEO Services Kenya',
  ],
  authors: [{ name: '363 Creators' }],
  openGraph: {
    title: '363 Creators | We Create. We Manage. We Grow.',
    description: 'Transforming businesses into digital market leaders through strategic content, web design, and paid growth funnels.',
    url: 'https://363creators.co.ke',
    siteName: '363 Creators',
    images: [
      {
        url: 'https://363creators.co.ke/og-image.jpg',
        width: 1024,
        height: 1024,
        alt: '363 Creators - Content. Design. Growth.',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: '363 Creators | Digital Agency',
    description: 'We Create. We Manage. We Grow.',
    creator: '@363creators',
    images: ['https://363creators.co.ke/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={jakarta.variable}>
      <head>
        <link rel="image_src" href="https://363creators.co.ke/og-image.jpg" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
