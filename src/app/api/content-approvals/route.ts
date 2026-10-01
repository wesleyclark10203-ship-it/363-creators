import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireClient } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const user = await requireClient()
    const { postId, action, feedback } = await req.json() // action: "APPROVE" | "REQUEST_CHANGES"

    if (!postId || !action) {
      return NextResponse.json({ error: 'Post ID and action are required' }, { status: 400 })
    }

    const post = await db.socialPost.findUnique({
      where: { id: postId },
      include: { project: true },
    })

    if (!post || post.project.clientProfileId !== user.clientProfileId) {
      return NextResponse.json({ error: 'Post not found or unauthorized' }, { status: 404 })
    }

    const newStatus = action === 'APPROVE' ? 'APPROVED' : 'REVISION_REQUESTED'

    const updatedPost = await db.socialPost.update({
      where: { id: postId },
      data: {
        status: newStatus,
        clientFeedback: feedback || null,
      },
    })

    await db.contentApproval.create({
      data: {
        socialPostId: postId,
        clientProfileId: user.clientProfileId!,
        status: newStatus,
        feedback: feedback || null,
      },
    })

    return NextResponse.json({ success: true, post: updatedPost })
  } catch (error: any) {
    console.error('Content approval error:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
