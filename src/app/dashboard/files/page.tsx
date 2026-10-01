export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Upload, Image, Video, ShieldCheck } from 'lucide-react'

export const revalidate = 0

export default async function ClientFilesPage() {
  const { user, clientProfileId } = await getCurrentUser()
  if (!user || user.role !== 'CLIENT' || !clientProfileId) redirect('/login')

  const files = await db.fileAsset.findMany({
    where: { clientProfileId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <DashboardSidebar userRole="CLIENT" userName={user.name} />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Project Files & Brand Assets</h1>
            <p className="text-xs text-slate-400 mt-1">Secure file repository for logos, brand guidelines, raw videos, and campaign assets.</p>
          </div>
          <Button variant="gradient" size="sm" className="gap-1">
            <Upload className="h-4 w-4" /> Upload New File
          </Button>
        </div>

        {files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {files.map((file) => (
              <Card key={file.id} className="p-5 bg-slate-900 border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <Badge variant="cyan">{file.fileType}</Badge>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white truncate">{file.fileName}</h4>
                  <p className="text-[11px] text-slate-400">Uploaded by: {file.uploadedBy}</p>
                </div>

                <a href={file.fileUrl} download className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    Download File <Download className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-slate-900 border-slate-800 text-center space-y-3">
            <ShieldCheck className="h-12 w-12 text-sky-400 mx-auto" />
            <h3 className="font-bold text-lg text-white">No Client Files Uploaded Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">Upload your brand guidelines or logo assets to share with our creative team.</p>
          </Card>
        )}
      </main>
    </div>
  )
}
