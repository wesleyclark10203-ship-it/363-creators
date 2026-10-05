import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const baseUrl = 'https://363creators.co.ke'

  const services = await db.service.findMany({ select: { slug: true, updatedAt: true } })
  const portfolio = await db.portfolioProject.findMany({ select: { slug: true, updatedAt: true } })
  const posts = await db.blogPost.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } })

  const staticPages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/pricing',

    '/blog',
    '/contact',
    '/get-a-quote',
    '/book-consultation',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
  ]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}

  ${services
    .map(
      (s) => `
    <url>
      <loc>${baseUrl}/services/${s.slug}</loc>
      <lastmod>${s.updatedAt.toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>`
    )
    .join('')}

  ${portfolio
    .map(
      (p) => `
    <url>
      <loc>${baseUrl}/portfolio/${p.slug}</loc>
      <lastmod>${p.updatedAt.toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}

  ${posts
    .map(
      (b) => `
    <url>
      <loc>${baseUrl}/blog/${b.slug}</loc>
      <lastmod>${b.updatedAt.toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
</urlset>`

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
