'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck2,
  FileSpreadsheet,
  FileText,
  CreditCard,
  MessageSquare,
  LogOut,
  Users,
  Settings,
  Briefcase,
  Star,
  BookOpen,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

export interface DashboardSidebarProps {
  userRole: 'CLIENT' | 'SUPER_ADMIN' | 'ADMIN' | 'STAFF'
  userName: string
  companyName?: string
}

export function DashboardSidebar({ userRole, userName, companyName }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  type NavItem = { name: string; href: string; icon: any; badge?: string }

  const clientNav: NavItem[] = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Content Approval', href: '/dashboard/content-calendar', icon: CalendarCheck2, badge: 'New' },
    { name: 'Reports & Analytics', href: '/dashboard/reports', icon: FileSpreadsheet },
    { name: 'Invoices & Payments', href: '/dashboard/invoices', icon: CreditCard },
    { name: 'Project Files', href: '/dashboard/files', icon: FileText },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ]

  const adminNav: NavItem[] = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Leads & Quotes', href: '/admin/leads', icon: Users },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck2 },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Content Manager', href: '/admin/content', icon: Sparkles },
    { name: 'Invoices & Payments', href: '/admin/invoices', icon: CreditCard },
    { name: 'Reports Publisher', href: '/admin/reports', icon: FileSpreadsheet },
    { name: 'Portfolio CMS', href: '/admin/portfolio', icon: Briefcase },
    { name: 'Blog CMS', href: '/admin/blog', icon: BookOpen },

    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ]

  const navItems = userRole === 'CLIENT' ? clientNav : adminNav

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="p-6 space-y-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-amber-400 p-0.5">
            <div className="h-full w-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center font-bold text-white text-sm">
              363
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-white tracking-tight">
              363 <span className="gradient-text font-black">CREATORS</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-sky-400 font-semibold">
              {userRole === 'CLIENT' ? 'Client Portal' : 'Admin Control'}
            </span>
          </div>
        </Link>

        {/* User Card */}
        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
            {userName[0]}
          </div>
          <div className="overflow-hidden text-xs">
            <p className="font-bold text-white truncate">{userName}</p>
            <p className="text-[10px] text-slate-400 truncate">{companyName || userRole}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[9px]">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </div>
        </button>
      </div>
    </aside>
  )
}
