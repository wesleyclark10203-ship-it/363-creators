export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { AdminSettingsForm } from '@/components/admin/admin-settings-form'

export const revalidate = 0

export default async function AdminSettingsPage() {
  const { user } = await getCurrentUser()
  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN')) redirect('/login')

  const rawSettings = await db.siteSetting.findMany()
  const settings = rawSettings.reduce((acc: any, s) => {
    acc[s.key] = s.value
    return acc
  }, {})

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-slate-100">
      <DashboardSidebar userRole={user.role as any} userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Site Settings & Brand Configuration CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Modify company contact details, WhatsApp phone number, social media links, and hero copy in real time.
          </p>
        </div>

        <AdminSettingsForm initialSettings={settings} />
      </main>
    </div>
  )
}
