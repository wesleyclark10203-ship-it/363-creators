import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { AdminBookingsView } from '@/components/admin/admin-bookings-view'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminBookingsPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const bookings = await db.consultation.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Consultation Bookings Management</h1>
          <p className="text-xs text-slate-400 mt-1">Approve, reschedule, or cancel client strategy call reservations.</p>
        </div>

        <AdminBookingsView initialBookings={bookings as any} />
      </main>
    </div>
  )
}
