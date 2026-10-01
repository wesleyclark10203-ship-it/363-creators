export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, Calendar, Users } from 'lucide-react'

export const revalidate = 0

export default async function ClientProjectsPage() {
  const { user, clientProfileId } = await getCurrentUser()
  if (!user || user.role !== 'CLIENT' || !clientProfileId) redirect('/login')

  const clientProfile = await db.clientProfile.findUnique({
    where: { id: clientProfileId },
    include: {
      projects: {
        include: { milestones: { orderBy: { order: 'asc' } } },
      },
    },
  })

  if (!clientProfile) redirect('/login')

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole="CLIENT" userName={user.name} companyName={clientProfile.companyName} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Client Projects & Milestones</h1>
          <p className="text-xs text-slate-400 mt-1">Track campaign timelines, deliverables, and assigned agency team members.</p>
        </div>

        <div className="space-y-8">
          {clientProfile.projects.map((project) => {
            const team = JSON.parse(project.assignedTeam || '[]')

            return (
              <Card key={project.id} className="p-8 bg-slate-900 border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                      <Badge variant={project.status === 'IN_PROGRESS' ? 'cyan' : 'gold'}>
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{project.description}</p>
                  </div>

                  <div className="text-right text-xs text-slate-400">
                    <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                    <p className="text-sky-400 font-bold">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Overall Progress</span>
                    <span className="text-sky-400">{project.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-amber-500 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                {/* Milestone Timeline */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-sm text-white">Milestone Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.milestones.map((m) => (
                      <div key={m.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">{m.name}</span>
                          <Badge variant={m.status === 'COMPLETED' ? 'cyan' : 'warning'}>{m.status}</Badge>
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Due: {new Date(m.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
