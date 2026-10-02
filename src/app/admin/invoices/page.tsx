export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const revalidate = 0

export default async function AdminInvoicesPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const invoices = await db.invoice.findMany({
    include: { clientProfile: true, payments: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Invoice & Payment Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Audit all billing activity, record payments, and track M-Pesa transaction receipts.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {invoices.map((inv) => (
            <Card key={inv.id} className="p-6 bg-slate-900 border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-400">{inv.invoiceNumber}</span>
                  <Badge variant={inv.status === 'PAID' ? 'cyan' : 'danger'}>{inv.status}</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">Client: {inv.clientProfile?.companyName} | Total: KSh {inv.total.toLocaleString()}</p>
              </div>

              <div className="text-right text-xs">
                <p className="text-emerald-400 font-bold">Paid: KSh {inv.amountPaid.toLocaleString()}</p>
                <p className="text-rose-400 font-bold">Balance: KSh {inv.balance.toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
