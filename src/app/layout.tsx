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
  title: {
    default: '363 Creators | Digital Agency - We Create. We Manage. We Grow.',
    template: '%s | 363 Creators',
  },
  description:
    '363 Creators is a leading digital agency based in Nairobi, Kenya providing Social Media Management, Website Design & Development, Digital Marketing, Branding, Content Creation, and SEO across East Africa and globally.',
  keywords: [
    'Digital Agency Kenya',
    'Digital Agency Nairobi',
    '363 Creators',
    'Social Media Management Nairobi',
    'Website Development Kenya',
    'Web Design Nairobi',
    'Digital Marketing East Africa',
    'Branding Agency Nairobi',
    'SEO Services Kenya',
    'Content Creation Kenya',
    'Next.js Web Agency Nairobi',
    'Paid Ads & Growth Funnels Kenya',
  ],
  authors: [{ name: '363 Creators', url: 'https://363creators.co.ke' }],
  creator: '363 Creators',
  publisher: '363 Creators',
  category: 'technology',
  alternates: {
    canonical: 'https://363creators.co.ke',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: '363 Creators | We Create. We Manage. We Grow.',
    description: 'Transforming businesses into digital market leaders through strategic content, web design, and paid growth funnels.',
    url: 'https://363creators.co.ke',
    siteName: '363 Creators',
    images: [
      {
        url: 'https://363creators.co.ke/og-image.jpg',
        secureUrl: 'https://363creators.co.ke/og-image.jpg',
        width: 1024,
        height: 1024,
        alt: '363 Creators - Content. Design. Growth.',
        type: 'image/jpeg',
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
    description: 'We Create. We Manage. We Grow. Full-service digital marketing, web development, and social media.',
    creator: '@363creators',
    images: ['https://363creators.co.ke/og-image.jpg'],
  },
  verification: {
    google: 'oOSHQWP7DYgaLTiYF76LfLvqd1WvsLzOFL3OpAeV08g',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ProfessionalService', 'Organization'],
      '@id': 'https://363creators.co.ke/#organization',
      name: '363 Creators',
      alternateName: '363 Creators Digital Agency',
      url: 'https://363creators.co.ke',
      logo: {
        '@type': 'ImageObject',
        url: 'https://363creators.co.ke/og-image.jpg',
        width: '1024',
        height: '1024',
      },
      image: 'https://363creators.co.ke/og-image.jpg',
      description:
        'Full-service digital agency crafting high-impact social media management, custom web development, video content, and growth funnels in Nairobi, Kenya and East Africa.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nairobi',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi County',
        postalCode: '00100',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -1.2921,
        longitude: 36.8219,
      },
      telephone: ['+254790671626', '+254707311381'],
      email: ['wesleyclark10203@gmail.com', 'andalamorgan@gmail.com'],
      sameAs: [
        'https://www.instagram.com/363creators/?utm_source=ig_web_button_share_sheet',
        'https://www.facebook.com/363creators.ke',
      ],
      priceRange: '$$',
      areaServed: [
        { '@type': 'Country', name: 'Kenya' },
        { '@type': 'Country', name: 'Uganda' },
        { '@type': 'Country', name: 'Tanzania' },
        { '@type': 'Country', name: 'Rwanda' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://363creators.co.ke/#website',
      url: 'https://363creators.co.ke',
      name: '363 Creators',
      publisher: {
        '@id': 'https://363creators.co.ke/#organization',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={jakarta.variable}>
      <head>
        <meta name="google-site-verification" content="oOSHQWP7DYgaLTiYF76LfLvqd1WvsLzOFL3OpAeV08g" />
        <link rel="image_src" href="https://363creators.co.ke/og-image.jpg" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
