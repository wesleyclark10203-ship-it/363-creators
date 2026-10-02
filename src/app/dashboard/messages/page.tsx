export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { ClientMessagesView } from '@/components/dashboard/client-messages-view'

export const revalidate = 0

export default async function ClientMessagesPage() {
  const { user, clientProfileId } = await getCurrentUser()
  if (!user || user.role !== 'CLIENT' || !clientProfileId) redirect('/login')

  const clientProfile = await db.clientProfile.findUnique({
    where: { id: clientProfileId },
    include: {
      projects: {
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            include: { sender: true },
          },
        },
      },
    },
  })

  if (!clientProfile) redirect('/login')

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-slate-100">
      <DashboardSidebar userRole="CLIENT" userName={user.name} />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Project Messaging Thread</h1>
          <p className="text-xs text-slate-400 mt-1">Direct communication with your assigned 363 Creators account management team.</p>
        </div>

        <ClientMessagesView projects={clientProfile.projects as any} currentUserId={user.userId} />
      </main>
    </div>
  )
}
