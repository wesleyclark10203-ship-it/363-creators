import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Blog & Insights | 363 Creators',
  description: 'Digital marketing tactics, web development trends, social media strategies, and SEO guides for East African businesses.',
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      slug: true,
      featuredImage: true,
      excerpt: true,
      category: true,
      author: true,
      publishedAt: true,
    },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <Badge variant="cyan">363 Journal</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Digital Growth <span className="gradient-text">Insights</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Actionable strategies, case studies, and technology guides written by our agency team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden group hover:shadow-2xl transition-all flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <Badge variant="cyan" className="absolute top-3 left-3 z-10">{post.category}</Badge>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
                <Link href={`/blog/${post.slug}`}>
                  <span className="font-bold text-sky-500 flex items-center gap-1 hover:underline">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
