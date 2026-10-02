export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const revalidate = 0

export default async function AdminPortfolioPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const projects = await db.portfolioProject.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Portfolio CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Manage public portfolio case studies, result metrics, and featured projects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.id} className="p-5 bg-slate-900 border-slate-800 space-y-3">
              <img src={p.featuredImage} alt={p.title} className="w-full h-36 object-cover rounded-xl" />
              <Badge variant="cyan">{p.industry}</Badge>
              <h4 className="font-bold text-sm text-white">{p.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
