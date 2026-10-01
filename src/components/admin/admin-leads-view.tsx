'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/input'
import { Mail, Phone, Calendar, Building, DollarSign, ArrowRight } from 'lucide-react'

export function AdminLeadsView({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = React.useState(initialLeads)

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status: newStatus }),
      })

      if (res.ok) {
        setLeads(leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="danger">New Lead</Badge>
      case 'QUALIFIED':
        return <Badge variant="gold">Qualified</Badge>
      case 'WON':
        return <Badge variant="cyan">Won / Converted</Badge>
      case 'PROPOSAL_SENT':
        return <Badge variant="cyan">Proposal Sent</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {leads.map((lead) => (
          <Card key={lead.id} className="p-6 bg-slate-900 border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-400">{lead.referenceNo}</span>
                  <h3 className="font-bold text-lg text-white">{lead.name}</h3>
                  {getStatusBadge(lead.status)}
                </div>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>Company: {lead.company || 'N/A'}</span>
                  <span>Source: {lead.source}</span>
                  <span>Date: {new Date(lead.createdAt).toLocaleDateString()}</span>
                </p>
              </div>

              <div className="w-48">
                <Select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  options={[
                    { label: 'New Lead', value: 'NEW' },
                    { label: 'Contacted', value: 'CONTACTED' },
                    { label: 'Qualified', value: 'QUALIFIED' },
                    { label: 'Proposal Sent', value: 'PROPOSAL_SENT' },
                    { label: 'Won Deal', value: 'WON' },
                    { label: 'Lost', value: 'LOST' },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Requested Service</p>
                <p className="font-bold text-sky-400">{lead.serviceRequested}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Budget Range</p>
                <p className="font-bold text-amber-400">{lead.budgetRange}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Contact Details</p>
                <p className="text-slate-300">{lead.email} | {lead.phone}</p>
              </div>
            </div>

            {lead.projectDetails && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <p className="font-bold text-slate-400 text-[10px] uppercase mb-1">Project Details / Requirements:</p>
                <p className="italic">"{lead.projectDetails}"</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
