import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const user = await requireAuth()
    const { projectId, content } = await req.json()

    if (!projectId || !content) {
      return NextResponse.json({ error: 'Project ID and content are required' }, { status: 400 })
    }

    const message = await db.message.create({
      data: {
        projectId,
        senderId: user.userId,
        senderRole: user.role,
        content,
      },
    })

    return NextResponse.json({ success: true, message })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
