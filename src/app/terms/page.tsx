export const metadata = {
  title: 'Terms & Conditions | 363 Creators',
}

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Terms & Conditions</h1>
      <p className="text-xs text-slate-400">Last updated: September 2026</p>

      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-sm leading-relaxed">
        <p>Welcome to 363 Creators. By accessing our platform or engaging our services, you agree to comply with the following Terms and Conditions.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">1. Scope of Services</h2>
        <p>363 Creators provides Social Media Management, Website Development, Digital Marketing, Branding, Content Creation, and SEO services as agreed in client proposals and service agreements.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">2. Client Approval & Approval Workflow</h2>
        <p>Clients are required to review and approve social media posts, graphics, and campaign copy via the 363 Client Portal. Posts approved or un-revised within specified deadlines will proceed to scheduled publishing.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">3. Payments & Invoicing</h2>
        <p>Invoices are generated electronically and payable via M-Pesa, Card, or Bank Transfer according to agreed billing frequencies. Late payments may result in temporary project suspension.</p>
      </div>
    </div>
  )
}
