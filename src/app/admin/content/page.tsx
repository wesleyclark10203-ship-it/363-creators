export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const revalidate = 0

export default async function AdminContentPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const posts = await db.socialPost.findMany({
    include: { project: { include: { client: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Social Media Content Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Review client approval statuses and revision feedback across all active social calendars.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-5 bg-slate-900 border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="cyan">{post.platform}</Badge>
                <Badge variant={post.status === 'APPROVED' ? 'cyan' : 'warning'}>{post.status}</Badge>
              </div>

              <h4 className="font-bold text-sm text-white">{post.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{post.caption}</p>
              <p className="text-[10px] text-sky-400 font-semibold">Client: {post.project.client?.companyName}</p>

              {post.clientFeedback && (
                <div className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-[11px]">
                  Feedback: "{post.clientFeedback}"
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
