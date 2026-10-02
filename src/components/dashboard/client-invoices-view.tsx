'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { CreditCard, Smartphone, Printer, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

export function ClientInvoicesView({ invoices, userPhone }: { invoices: any[]; userPhone: string }) {
  const [selectedInvoice, setSelectedInvoice] = React.useState<any | null>(null)
  const [payModalInvoice, setPayModalInvoice] = React.useState<any | null>(null)

  const [phone, setPhone] = React.useState('254712345678')
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [error, setError] = React.useState('')

  const handleMpesaPay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!payModalInvoice) return
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/payments/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: payModalInvoice.id,
          phoneNumber: phone,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setMessage(data.message)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setError(data.error || 'STK Push initiation failed.')
      }
    } catch (err: any) {
      setError('An error occurred during payment processing.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-8">
      {/* Invoices List */}
      <div className="grid grid-cols-1 gap-6">
        {invoices.map((inv) => {
          const items = JSON.parse(inv.items || '[]')

          return (
            <Card key={inv.id} className="p-6 bg-slate-900 border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-xl text-white">{inv.invoiceNumber}</h3>
                    <Badge variant={inv.status === 'PAID' ? 'cyan' : 'danger'}>{inv.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Issued: {new Date(inv.issueDate).toLocaleDateString()} | Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Invoice Amount</p>
                  <p className="text-2xl font-black text-white">KSh {inv.total.toLocaleString()}</p>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-2 rounded-l-lg">Description</th>
                      <th className="p-2 text-center">Qty</th>
                      <th className="p-2 text-right">Unit Price</th>
                      <th className="p-2 text-right rounded-r-lg">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: any, i: number) => (
                      <tr key={i} className="border-b border-slate-800/60">
                        <td className="p-2">{item.description}</td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-right">KSh {item.unitPrice?.toLocaleString()}</td>
                        <td className="p-2 text-right font-bold text-white">KSh {item.total?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Payment Bar & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800">
                <div className="text-xs space-y-0.5">
                  <p className="text-slate-400">Amount Paid: <span className="text-emerald-400 font-bold">KSh {inv.amountPaid.toLocaleString()}</span></p>
                  <p className="text-slate-400">Balance Due: <span className="text-rose-400 font-bold">KSh {inv.balance.toLocaleString()}</span></p>
                </div>

                <div className="flex items-center gap-3">
                  <Button onClick={() => setSelectedInvoice(inv)} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-1" /> View / Print PDF
                  </Button>

                  {inv.balance > 0 && (
                    <Button onClick={() => setPayModalInvoice(inv)} variant="gradient" size="sm">
                      <Smartphone className="h-4 w-4 mr-1" /> Pay Now via M-Pesa
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* M-Pesa STK Push Payment Modal */}
      {payModalInvoice && (
        <Modal
          isOpen={!!payModalInvoice}
          onClose={() => setPayModalInvoice(null)}
          title={`Pay Invoice ${payModalInvoice.invoiceNumber}`}
          description={`Amount Due: KSh ${payModalInvoice.balance.toLocaleString()}`}
        >
          {message ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleMpesaPay} className="space-y-6 pt-2">
              {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">{error}</div>}

              <Input
                label="M-Pesa Registered Mobile Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="254712345678"
                required
              />

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <p className="font-bold text-white">How M-Pesa STK Push Works:</p>
                <p>1. Enter your phone number and click "Send Prompt".</p>
                <p>2. Check your phone screen for the Safaricom PIN popup.</p>
                <p>3. Enter your M-Pesa PIN to complete payment.</p>
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full" isLoading={loading}>
                Send M-Pesa PIN Prompt <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          )}
        </Modal>
      )}

      {/* PDF Printable Modal */}
      {selectedInvoice && (
        <Modal isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} maxWidth="2xl">
          <div className="p-6 bg-white text-slate-900 space-y-6 font-sans print:p-0">
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">363 CREATORS</h2>
                <p className="text-xs text-slate-500">Digital Agency | Nairobi, Kenya</p>
                <p className="text-xs text-slate-500">wesleyclark10203@gmail.com | andalamorgan@gmail.com</p>
                <p className="text-xs text-slate-500">Tel: +254 790 671626 / +254 707 311381</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-sky-600">INVOICE</h3>
                <p className="text-xs font-mono font-bold text-slate-700">{selectedInvoice.invoiceNumber}</p>
                <p className="text-xs text-slate-500">Date: {new Date(selectedInvoice.issueDate).toLocaleDateString()}</p>
                <p className="text-xs text-slate-500">Due: {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 font-bold">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {JSON.parse(selectedInvoice.items || '[]').map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-slate-200">
                    <td className="py-2.5 font-medium">{item.description}</td>
                    <td className="py-2.5 text-center">{item.qty}</td>
                    <td className="py-2.5 text-right">KSh {item.unitPrice?.toLocaleString()}</td>
                    <td className="py-2.5 text-right font-bold">KSh {item.total?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end pt-4 border-t">
              <div className="w-60 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>KSh {selectedInvoice.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT Tax:</span>
                  <span>KSh {selectedInvoice.tax?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-sm border-t pt-1">
                  <span>Total Amount:</span>
                  <span>KSh {selectedInvoice.total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Amount Paid:</span>
                  <span>KSh {selectedInvoice.amountPaid?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Balance Due:</span>
                  <span>KSh {selectedInvoice.balance?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t text-[10px] text-slate-500 text-center">
              Thank you for your partnership with 363 Creators!
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button onClick={handlePrint} variant="primary">Print Invoice PDF</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
