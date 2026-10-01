export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { ClientReportsView } from '@/components/dashboard/client-reports-view'

export const revalidate = 0

export default async function ClientReportsPage() {
  const { user, clientProfileId } = await getCurrentUser()
  if (!user || user.role !== 'CLIENT' || !clientProfileId) redirect('/login')

  const reports = await db.report.findMany({
    where: { clientProfileId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole="CLIENT" userName={user.name} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Performance Analytics & Reports</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time engagement, follower growth, website traffic, and lead conversion metrics.</p>
        </div>

        <ClientReportsView reports={reports as any} />
      </main>
    </div>
  )
}
