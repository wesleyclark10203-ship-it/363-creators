import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany()
    const mapped = settings.reduce((acc: any, s) => {
      acc[s.key] = s.value
      return acc
    }, {})
    return NextResponse.json({ settings: mapped })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin()
    const settingsMap = await req.json() // { key: value }

    for (const [key, value] of Object.entries(settingsMap)) {
      await db.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
