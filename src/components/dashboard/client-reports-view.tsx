'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, FileSpreadsheet, TrendingUp, Users, Eye, MousePointer } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const sampleChartData = [
  { month: 'May', reach: 120000, engagement: 8400, clicks: 1200 },
  { month: 'Jun', reach: 180000, engagement: 12600, clicks: 1900 },
  { month: 'Jul', reach: 240000, engagement: 18200, clicks: 2800 },
  { month: 'Aug', reach: 310000, engagement: 23500, clicks: 3600 },
  { month: 'Sep', reach: 380000, engagement: 28900, clicks: 4120 },
]

export function ClientReportsView({ reports }: { reports: any[] }) {
  const latestReport = reports[0]
  const metrics = latestReport ? JSON.parse(latestReport.metrics || '{}') : {}

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Metric,Value\n" +
      Object.entries(metrics).map(([k, v]) => `${k},${v}`).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `363_Report_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <p className="text-xs text-slate-400">Total Followers</p>
          <p className="text-2xl font-bold text-white">{metrics.followers || '45,200'}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+3,400 this month</span>
        </Card>

        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <p className="text-xs text-slate-400">Social Reach</p>
          <p className="text-2xl font-bold text-sky-400">{metrics.reach || '210,000'}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+42% Growth</span>
        </Card>

        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <p className="text-xs text-slate-400">Engagement Rate</p>
          <p className="text-2xl font-bold text-amber-400">{metrics.engagementRate || '5.8%'}</p>
          <span className="text-[10px] text-slate-400">Industry Avg: 2.1%</span>
        </Card>

        <Card className="p-5 bg-slate-900 border-slate-800 space-y-2">
          <p className="text-xs text-slate-400">Website Clicks</p>
          <p className="text-2xl font-bold text-white">{metrics.websiteClicks || '4,120'}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">42 direct bookings</span>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="p-6 bg-slate-900 border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Audience Growth & Reach Trend</h2>
            <p className="text-xs text-slate-400">Monthly reach performance across all active channels</p>
          </div>
          <Button onClick={exportCSV} variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleChartData}>
              <defs>
                <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="reach" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#reachGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Published Reports List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Monthly Analytics Archive</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((rep) => (
            <Card key={rep.id} className="p-5 bg-slate-900 border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <Badge variant="gold">{rep.period}</Badge>
                <h4 className="font-bold text-sm text-white">{rep.title}</h4>
                <p className="text-xs text-slate-400">Type: {rep.reportType}</p>
              </div>
              <Button onClick={exportCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
