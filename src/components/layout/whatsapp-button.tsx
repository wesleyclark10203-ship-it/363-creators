'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const pathname = usePathname()
  const isDashboardOrAdmin = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  if (isDashboardOrAdmin) return null

  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254790671626'
  const message = encodeURIComponent('Hello 363 Creators! I would like to inquire about your digital agency services.')

  return (
    <a
      href={`https://wa.me/${whatsappNum}?text=${message}`}
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
