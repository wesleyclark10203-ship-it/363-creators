import { redirect } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  FolderKanban,
  CreditCard,
  CalendarCheck2,
  Sparkles,
  TrendingUp,
  DollarSign,
  ArrowRight,
  BookOpen,
  Briefcase,
} from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminDashboardOverview() {
  const { user } = await getCurrentUser()

  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) {
    redirect('/login')
  }

  // Fetch Admin Stats from DB
  const clientsCount = await db.clientProfile.count()
  const leadsCount = await db.lead.count()
  const activeProjectsCount = await db.project.count({ where: { status: 'IN_PROGRESS' } })
  const pendingApprovalsCount = await db.socialPost.count({ where: { status: 'PENDING_APPROVAL' } })
  const upcomingBookingsCount = await db.consultation.count({ where: { status: 'APPROVED' } })

  const invoices = await db.invoice.findMany()
  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.amountPaid, 0)
  const totalOutstanding = invoices.reduce((acc, inv) => acc + inv.balance, 0)

  const recentLeads = await db.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  const recentProjects = await db.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
    include: { client: true },
  })

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} companyName="Executive Agency Command" />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Agency Command Center</h1>
            <p className="text-xs text-slate-400 mt-1">Executive overview for 363 Creators platform operations.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/leads">
              <Button variant="gradient" size="sm">
                View New Leads ({leadsCount})
              </Button>
            </Link>
          </div>
        </div>

        {/* Executive Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Clients</span>
              <Users className="h-5 w-5 text-sky-400" />
            </div>
            <p className="text-3xl font-black text-white">{clientsCount}</p>
            <p className="text-[11px] text-slate-400">Active Retainers</p>
          </Card>

          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Revenue Collected</span>
              <DollarSign className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400">KSh {totalRevenue.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400">From client payments</p>
          </Card>

          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Pending Post Approvals</span>
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-3xl font-black text-amber-400">{pendingApprovalsCount}</p>
            <p className="text-[11px] text-slate-400">Awaiting client decision</p>
          </Card>

          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Outstanding Balances</span>
              <CreditCard className="h-5 w-5 text-rose-400" />
            </div>
            <p className="text-2xl font-black text-rose-400">KSh {totalOutstanding.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400">Unpaid invoices</p>
          </Card>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Projects List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-sky-400" /> Agency Client Projects
              </h2>
              <Link href="/admin/projects" className="text-xs text-sky-400 font-bold hover:underline">
                Manage All →
              </Link>
            </div>

            <div className="space-y-4">
              {recentProjects.map((proj) => (
                <Card key={proj.id} className="p-5 bg-slate-900 border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{proj.name}</h4>
                      <Badge variant="cyan">{proj.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Client: {proj.client?.companyName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-sky-400">{proj.progress}% Progress</p>
                    <p className="text-[10px] text-slate-400">{proj.serviceType}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Incoming Leads Pipeline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-400" /> Incoming Leads Pipeline
              </h2>
              <Link href="/admin/leads" className="text-xs text-sky-400 font-bold hover:underline">
                Lead Pipeline →
              </Link>
            </div>

            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <Card key={lead.id} className="p-4 bg-slate-900 border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-400 font-bold">{lead.referenceNo}</span>
                    <Badge variant={lead.status === 'NEW' ? 'danger' : 'cyan'}>{lead.status}</Badge>
                  </div>
                  <h4 className="font-bold text-sm text-white">{lead.name} ({lead.company || 'Individual'})</h4>
                  <p className="text-xs text-slate-400">Requested: {lead.serviceRequested} | Budget: {lead.budgetRange}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
