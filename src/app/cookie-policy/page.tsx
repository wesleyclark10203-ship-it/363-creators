export const metadata = {
  title: 'Cookie Policy | 363 Creators',
}

export default function CookiePolicyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Cookie Policy</h1>
      <p className="text-xs text-slate-400">Last updated: September 2026</p>

      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-sm leading-relaxed">
        <p>This Cookie Policy explains how 363 Creators uses cookies and similar session technologies to recognize you when you visit our web application.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">1. Essential Authentication Cookies</h2>
        <p>We use HTTP-Only secure cookies (`363_auth_token`) solely to maintain authenticated client and admin dashboard sessions.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">2. Preference Cookies</h2>
        <p>We store theme preferences (light/dark mode) locally to ensure your visual experience remains consistent across visits.</p>
      </div>
    </div>
  )
}
