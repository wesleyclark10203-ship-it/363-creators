export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { ContentApprovalGrid } from '@/components/dashboard/content-approval-grid'

export const revalidate = 0

export default async function ContentCalendarPage() {
  const { user, clientProfileId } = await getCurrentUser()

  if (!user || user.role !== 'CLIENT' || !clientProfileId) {
    redirect('/login')
  }

  const clientProfile = await db.clientProfile.findUnique({
    where: { id: clientProfileId },
    include: {
      projects: {
        include: {
          socialPosts: {
            orderBy: { scheduledDate: 'asc' },
            include: { approvals: { orderBy: { decisionDate: 'desc' } } },
          },
        },
      },
    },
  })

  if (!clientProfile) redirect('/login')

  const posts = clientProfile.projects.flatMap((p) => p.socialPosts)

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole="CLIENT" userName={user.name} companyName={clientProfile.companyName} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Social Media Content Approval</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review upcoming social media graphics, video reels, captions, and hashtags for <span className="text-sky-400 font-bold">{clientProfile.companyName}</span>.
          </p>
        </div>

        <ContentApprovalGrid initialPosts={posts as any} />
      </main>
    </div>
  )
}
