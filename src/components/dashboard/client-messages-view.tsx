'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, User } from 'lucide-react'

export function ClientMessagesView({ projects, currentUserId }: { projects: any[]; currentUserId: string }) {
  const [activeProject, setActiveProject] = React.useState(projects[0])
  const [messages, setMessages] = React.useState(projects[0]?.messages || [])
  const [content, setContent] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !activeProject) return
    setLoading(true)

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject.id,
          content,
        }),
      })

      const data = await res.json()
      if (res.ok && data.message) {
        setMessages([...messages, { ...data.message, sender: { name: 'You' } }])
        setContent('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
      {/* Projects List Selector */}
      <Card className="lg:col-span-4 p-4 bg-slate-900 border-slate-800 space-y-2 overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider p-2">Select Active Conversation</h3>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActiveProject(p)
              setMessages(p.messages)
            }}
            className={`w-full p-3 rounded-xl text-left text-xs transition-all ${
              activeProject?.id === p.id
                ? 'bg-sky-500 text-white font-bold'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <p className="font-bold text-sm truncate">{p.name}</p>
            <p className="text-[10px] opacity-80 mt-0.5">{p.serviceType}</p>
          </button>
        ))}
      </Card>

      {/* Messages Thread Container */}
      <Card className="lg:col-span-8 bg-slate-900 border-slate-800 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-white">{activeProject?.name}</h3>
            <p className="text-[10px] text-slate-400">Assigned Team: 363 Growth Strategists</p>
          </div>
        </div>

        {/* Message Bubble List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {messages.map((m: any) => {
            const isMe = m.senderId === currentUserId

            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                    isMe
                      ? 'bg-sky-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p className="font-bold text-[10px] opacity-75">{m.sender?.name || (isMe ? 'You' : 'Agency Team')}</p>
                  <p className="leading-relaxed">{m.content}</p>
                  <p className="text-[9px] opacity-60 text-right">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Send Input */}
        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message to your assigned agency team..."
            className="flex-1 bg-slate-900 border-slate-800 text-white"
          />
          <Button type="submit" variant="gradient" size="sm" isLoading={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  )
}
