export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const revalidate = 0

export default async function AdminProjectsPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const projects = await db.project.findMany({
    include: { client: true, milestones: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Project & Milestone Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Manage active agency projects, update milestone progress %, and assign team members.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((p) => (
            <Card key={p.id} className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-white">{p.name}</h3>
                    <Badge variant="cyan">{p.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">Client: {p.client.companyName} | Service: {p.serviceType}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Progress</p>
                  <p className="text-xl font-bold text-sky-400">{p.progress}%</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {p.milestones.map((m) => (
                  <div key={m.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="font-bold text-slate-200">{m.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Status: {m.status}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
