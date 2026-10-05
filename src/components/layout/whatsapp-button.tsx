'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function WhatsAppButton() {
  const pathname = usePathname()
  const isDashboardOrAdmin = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  if (isDashboardOrAdmin) return null

  return (
    <a
      href={getWhatsAppUrl('Hello 363 Creators! I would like to make an enquiry about your digital agency services.')}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-white stroke-none group-hover:rotate-12 transition-transform" />
      <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">Talk to Us</span>
    </a>
  )
}
