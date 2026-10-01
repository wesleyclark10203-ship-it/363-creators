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
  return {
    title: `${post.seoTitle || post.title} | 363 Creators`,
    description: post.seoDescription || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } })

  if (!post) notFound()

  const tags = JSON.parse(post.tags || '[]')

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Journal
        </Button>
      </Link>

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
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Tags:</span>
          {tags.map((t: string) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
        </div>
      )}

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold">Want us to implement these growth strategies for your brand?</h3>
        <Link href="/get-a-quote">
          <Button variant="gradient">Get a Customized Proposal</Button>
        </Link>
      </div>
    </div>
  )
}
