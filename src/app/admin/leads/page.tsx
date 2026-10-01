export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { AdminLeadsView } from '@/components/admin/admin-leads-view'

export const revalidate = 0

export default async function AdminLeadsPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Lead & Quote Management Pipeline</h1>
          <p className="text-xs text-slate-400 mt-1">Track incoming quote inquiries, qualify leads, and update deal statuses.</p>
        </div>

        <AdminLeadsView initialLeads={leads as any} />
      </main>
    </div>
  )
}
