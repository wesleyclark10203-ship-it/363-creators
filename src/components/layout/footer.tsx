'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Instagram, Facebook, MessageSquare, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function Footer() {
  const pathname = usePathname()
  const isDashboardOrAdmin = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  if (isDashboardOrAdmin) return null

  return (
    <footer className="bg-slate-900 dark:bg-[#060911] text-slate-300 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-slate-700 bg-white shadow-md">
                <Image
                  src="/logo.jpg"
                  alt="363 Creators Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                363 <span className="gradient-text font-black">CREATORS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We Create. We Manage. We Grow. 363 Creators is a full-service digital agency crafting high-impact social media, websites, content, and growth funnels for East Africa and global brands.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/363creators/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Follow 363 Creators on Instagram"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-sky-600 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/363creators.ke"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Follow 363 Creators on Facebook"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-sky-600 hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/social-media-management" className="hover:text-cyan-400 transition-colors">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-cyan-400 transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" className="hover:text-cyan-400 transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/branding" className="hover:text-cyan-400 transition-colors">
                  Branding & Creative Design
                </Link>
              </li>
              <li>
                <Link href="/services/content-creation" className="hover:text-cyan-400 transition-colors">
                  Content Creation & Video
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-cyan-400 transition-colors">
                  SEO & Search Rankings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-cyan-400 transition-colors">
                  Our Portfolio
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/book-consultation" className="hover:text-cyan-400 transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact & Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="mailto:wesleyclark10203@gmail.com" className="hover:text-white">wesleyclark10203@gmail.com</a>
                  <a href="mailto:andalamorgan@gmail.com" className="hover:text-white">andalamorgan@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <Phone className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+254790671626" className="hover:text-white">0790 671 626</a>
                  <a href="tel:+254707311381" className="hover:text-white">0707 311 381</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href={getWhatsAppUrl('Hello 363 Creators! I would like to make an enquiry about your services.')} target="_blank" rel="noreferrer" className="hover:text-white">
                  WhatsApp Support
                </a>
              </li>
              <li className="pt-2">
                <Link href="/login" className="inline-flex items-center text-xs text-sky-400 hover:text-sky-300 font-semibold">
                  Client Portal Login <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} 363 Creators Digital Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms & Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-slate-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
