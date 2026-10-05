import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /login
Disallow: /register

# Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Host
Host: https://363creators.co.ke

# Sitemaps
Sitemap: https://363creators.co.ke/sitemap.xml`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
