import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post) return {}
  const canonicalUrl = `https://363creators.co.ke/blog/${post.slug}`
  return {
    title: `${post.seoTitle || post.title} | 363 Creators Insights`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.seoTitle || post.title} | 363 Creators`,
      description: post.seoDescription || post.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
      images: [
        {
          url: post.featuredImage || 'https://363creators.co.ke/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.seoTitle || post.title} | 363 Creators`,
      description: post.seoDescription || post.excerpt,
      images: [post.featuredImage || 'https://363creators.co.ke/og-image.jpg'],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } })

  if (!post) notFound()

  const tags = JSON.parse(post.tags || '[]')

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || 'https://363creators.co.ke/og-image.jpg',
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: '363 Creators',
      url: 'https://363creators.co.ke',
      logo: {
        '@type': 'ImageObject',
        url: 'https://363creators.co.ke/og-image.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://363creators.co.ke/blog/${post.slug}`,
    },
  }

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
        name: 'Blog',
        item: 'https://363creators.co.ke/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://363creators.co.ke/blog/${post.slug}`,
      },
    ],
  }

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Button>
        </Link>
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 hidden sm:flex items-center gap-2">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      <div className="space-y-4">
        <Badge variant="cyan">{post.category}</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 border-y border-slate-200 dark:border-slate-800 py-3">
          <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 h-[380px]">
        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Markdown/HTML Body */}
      <article className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
        <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">{post.excerpt}</p>
        <div className="whitespace-pre-line text-base">{post.content}</div>
      </article>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase">Tags:</span>
          {tags.map((t: string) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
        </div>
      )}

      {/* Internal Backlinks: Related Agency Services */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Related Strategic Services</h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/services/social-media-management" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-sky-500 transition-colors font-medium">
            Social Media Management
          </Link>
          <Link href="/services/website-development" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-sky-500 transition-colors font-medium">
            Website Development
          </Link>
          <Link href="/services/digital-marketing" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-sky-500 transition-colors font-medium">
            Digital Marketing & Paid Ads
          </Link>
          <Link href="/services/seo" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-sky-500 transition-colors font-medium">
            SEO & Search Visibility
          </Link>
          <Link href="/services/branding" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-sky-500 transition-colors font-medium">
            Branding & Creative Design
          </Link>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">Want us to implement these growth strategies for your brand?</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/get-a-quote">
            <Button variant="gradient">Get a Customized Proposal</Button>
          </Link>
          <Link href="/book-consultation">
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              Book a Strategy Call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
