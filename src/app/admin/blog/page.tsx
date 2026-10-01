import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminBlogPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const posts = await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Blog CMS Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Publish, edit, or unpublish marketing insights and SEO blog articles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-5 bg-slate-900 border-slate-800 space-y-3">
              <img src={post.featuredImage} alt={post.title} className="w-full h-36 object-cover rounded-xl" />
              <Badge variant="cyan">{post.category}</Badge>
              <h4 className="font-bold text-sm text-white">{post.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
