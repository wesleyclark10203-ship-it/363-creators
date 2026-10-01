'use client'

import * as React from 'react'
import { CheckCircle2, MessageSquare, Clock, AlertCircle, Eye, ThumbsUp, RotateCcw, Calendar, Hash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { Textarea } from '@/components/ui/input'

export function ContentApprovalGrid({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = React.useState(initialPosts)
  const [filter, setFilter] = React.useState<'ALL' | 'PENDING_APPROVAL' | 'APPROVED' | 'REVISION_REQUESTED'>('ALL')
  const [selectedPost, setSelectedPost] = React.useState<any | null>(null)

  const [feedback, setFeedback] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const filteredPosts = posts.filter((p) => {
    if (filter === 'ALL') return true
    return p.status === filter
  })

  const handleAction = async (action: 'APPROVE' | 'REQUEST_CHANGES') => {
    if (!selectedPost) return
    setLoading(true)

    try {
      const res = await fetch('/api/content-approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: selectedPost.id,
          action,
          feedback: action === 'REQUEST_CHANGES' ? feedback : null,
        }),
      })

      const data = await res.json()
      if (res.ok && data.post) {
        setPosts(posts.map((p) => (p.id === data.post.id ? { ...p, ...data.post } : p)))
        setSelectedPost(null)
        setFeedback('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="cyan">Approved</Badge>
      case 'PENDING_APPROVAL':
        return <Badge variant="warning">Pending Review</Badge>
      case 'REVISION_REQUESTED':
        return <Badge variant="danger">Revision Requested</Badge>
      case 'SCHEDULED':
        return <Badge variant="cyan">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'ALL' ? 'bg-sky-500 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          All Posts ({posts.length})
        </button>
        <button
          onClick={() => setFilter('PENDING_APPROVAL')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'PENDING_APPROVAL' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Pending Approval ({posts.filter((p) => p.status === 'PENDING_APPROVAL').length})
        </button>
        <button
          onClick={() => setFilter('APPROVED')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'APPROVED' ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Approved ({posts.filter((p) => p.status === 'APPROVED').length})
        </button>
        <button
          onClick={() => setFilter('REVISION_REQUESTED')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'REVISION_REQUESTED' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Revision Requested ({posts.filter((p) => p.status === 'REVISION_REQUESTED').length})
        </button>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="bg-slate-900 border-slate-800 overflow-hidden flex flex-col justify-between">
            <div className="relative h-52 overflow-hidden bg-slate-950">
              <img src={post.mediaUrl} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant="cyan">{post.platform}</Badge>
                {getStatusBadge(post.status)}
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-white">{post.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3">{post.caption}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-sky-400" />
                  {new Date(post.scheduledDate).toLocaleDateString()}
                </span>
                <Button onClick={() => setSelectedPost(post)} variant="outline" size="sm" className="gap-1">
                  <Eye className="h-3.5 w-3.5" /> Inspect Post
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Post Modal Inspection & Approval Drawer */}
      {selectedPost && (
        <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} maxWidth="xl" title={selectedPost.title}>
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Media Preview */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-[300px]">
                <img src={selectedPost.mediaUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              {/* Post Details */}
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="cyan">{selectedPost.platform}</Badge>
                  {getStatusBadge(selectedPost.status)}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase">Caption & Creative Copy</label>
                  <p className="p-3 bg-slate-900 rounded-xl text-slate-200 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-line border border-slate-800">
                    {selectedPost.caption}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Hash className="h-3 w-3" /> Hashtag Strategy
                  </label>
                  <p className="p-2 bg-slate-900 rounded-xl text-sky-400 font-mono text-[11px] border border-slate-800">
                    {selectedPost.hashtags}
                  </p>
                </div>
              </div>
            </div>

            {/* Revision Request Feedback Box */}
            {selectedPost.clientFeedback && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs space-y-1">
                <p className="font-bold uppercase text-[10px]">Previous Feedback / Revision Request:</p>
                <p>"{selectedPost.clientFeedback}"</p>
              </div>
            )}

            {/* Action Buttons */}
            {selectedPost.status === 'PENDING_APPROVAL' || selectedPost.status === 'REVISION_REQUESTED' ? (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <Textarea
                  label="Request Changes / Revision Feedback (Optional)"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Specify any changes needed (e.g. update background audio, change text overlay)..."
                />

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleAction('APPROVE')}
                    variant="gradient"
                    className="flex-1"
                    isLoading={loading}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" /> Approve Post For Scheduling
                  </Button>

                  <Button
                    onClick={() => handleAction('REQUEST_CHANGES')}
                    variant="danger"
                    className="flex-1"
                    isLoading={loading}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" /> Request Revision
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs text-center font-bold">
                ✓ Post is Approved and Queued for Scheduled Publishing.
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
