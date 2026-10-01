export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FolderKanban,
  CalendarCheck2,
  CreditCard,
  MessageSquare,
  FileSpreadsheet,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

export const revalidate = 0

export default async function ClientDashboardOverview() {
  const { user, clientProfileId } = await getCurrentUser()

  if (!user || user.role !== 'CLIENT' || !clientProfileId) {
    redirect('/login')
  }

  const clientProfile = await db.clientProfile.findUnique({
    where: { id: clientProfileId },
    include: {
      projects: {
        include: {
          socialPosts: { orderBy: { scheduledDate: 'asc' } },
          milestones: true,
        },
      },
      invoices: { orderBy: { createdAt: 'desc' } },
      reports: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  })

  if (!clientProfile) {
    redirect('/login')
  }

  // Calculate metrics
  const activeProjects = clientProfile.projects.filter((p) => p.status === 'IN_PROGRESS' || p.status === 'REVIEW')
  const allSocialPosts = clientProfile.projects.flatMap((p) => p.socialPosts)
  const pendingApprovals = allSocialPosts.filter((post) => post.status === 'PENDING_APPROVAL')
  const upcomingPosts = allSocialPosts.filter((post) => post.status === 'APPROVED' || post.status === 'SCHEDULED')

  const outstandingInvoices = clientProfile.invoices.filter((inv) => inv.status === 'SENT' || inv.status === 'OVERDUE')
  const totalBalanceDue = outstandingInvoices.reduce((acc, inv) => acc + inv.balance, 0)

  const latestReport = clientProfile.reports[0]

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole="CLIENT" userName={user.name} companyName={clientProfile.companyName} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Welcome back, {user.name} 👋</h1>
            <p className="text-xs text-slate-400 mt-1">
              Client Portal Overview for <span className="text-sky-400 font-bold">{clientProfile.companyName}</span>
            </p>
          </div>
          <Link href="/dashboard/content-calendar">
            <Button variant="gradient" size="sm">
              Review Pending Approvals ({pendingApprovals.length}) <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Active Projects</span>
              <FolderKanban className="h-5 w-5 text-sky-400" />
            </div>
            <p className="text-3xl font-black text-white">{activeProjects.length}</p>
            <p className="text-[11px] text-slate-400">In Progress & Review</p>
          </Card>

          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Pending Approvals</span>
              <CalendarCheck2 className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-3xl font-black text-amber-400">{pendingApprovals.length}</p>
            <p className="text-[11px] text-slate-400">Posts awaiting your review</p>
          </Card>

          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Upcoming Posts</span>
              <Clock className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-white">{upcomingPosts.length}</p>
            <p className="text-[11px] text-slate-400">Approved & scheduled</p>
          </Card>

          <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Outstanding Balance</span>
              <CreditCard className="h-5 w-5 text-rose-400" />
            </div>
            <p className="text-2xl font-black text-rose-400">KSh {totalBalanceDue.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400">{outstandingInvoices.length} unpaid invoice(s)</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Projects Tracker */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-sky-400" /> Active Projects Progress
              </h2>
              <Link href="/dashboard/projects" className="text-xs text-sky-400 font-bold hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {clientProfile.projects.map((proj) => (
                <Card key={proj.id} className="p-6 bg-slate-900 border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white">{proj.name}</h3>
                      <p className="text-xs text-slate-400">{proj.serviceType}</p>
                    </div>
                    <Badge variant={proj.status === 'IN_PROGRESS' ? 'cyan' : 'gold'}>
                      {proj.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Completion</span>
                      <span className="text-sky-400">{proj.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>Deadline: {new Date(proj.deadline).toLocaleDateString()}</span>
                    <span>{proj.milestones.length} Milestones</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Pending Approval Quick Drawer & Latest Report */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarCheck2 className="h-5 w-5 text-amber-400" /> Posts Awaiting Approval
            </h2>

            {pendingApprovals.length > 0 ? (
              <div className="space-y-4">
                {pendingApprovals.map((post) => (
                  <Card key={post.id} className="p-5 bg-slate-900 border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="cyan">{post.platform}</Badge>
                      <span className="text-slate-400">{new Date(post.scheduledDate).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2">{post.caption}</p>
                    <Link href="/dashboard/content-calendar" className="block pt-2">
                      <Button variant="gradient" size="sm" className="w-full">
                        Review Post
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 bg-slate-900 border-slate-800 text-center text-xs text-slate-400">
                All posts have been reviewed & approved! 🎉
              </Card>
            )}

            {/* Latest Report Widget */}
            {latestReport && (
              <Card className="p-6 bg-slate-900 border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">Latest Report</h3>
                  <Badge variant="gold">{latestReport.period}</Badge>
                </div>
                <p className="text-xs text-slate-400">{latestReport.title}</p>
                <Link href="/dashboard/reports" className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Open Analytics Report <FileSpreadsheet className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
