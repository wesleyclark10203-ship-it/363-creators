export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { ClientInvoicesView } from '@/components/dashboard/client-invoices-view'

export const revalidate = 0

export default async function ClientInvoicesPage() {
  const { user, clientProfileId } = await getCurrentUser()
  if (!user || user.role !== 'CLIENT' || !clientProfileId) redirect('/login')

  const invoices = await db.invoice.findMany({
    where: { clientProfileId },
    include: { payments: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole="CLIENT" userName={user.name} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Invoices & Payment Processing</h1>
          <p className="text-xs text-slate-400 mt-1">View billing history, download PDF invoices, and process instant M-Pesa or Card payments.</p>
        </div>

        <ClientInvoicesView invoices={invoices as any} userPhone={user.email} />
      </main>
    </div>
  )
}
