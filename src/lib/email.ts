export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = process.env.EMAIL_PROVIDER || 'mock'
  const fromEmail = options.from || process.env.EMAIL_FROM || '363 Creators <noreply@363creators.com>'

  console.log(`[EMAIL ABSTRACTION - Mode: ${provider}] Sending to ${options.to}: "${options.subject}"`)

  if (provider === 'resend' && process.env.EMAIL_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [options.to],
          subject: options.subject,
          html: options.html,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        return { success: false, error: JSON.stringify(errorData) }
      }

      const data = await res.json()
      return { success: true, messageId: data.id }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  // Development/Mock fallback mode
  return {
    success: true,
    messageId: `mock-msg-${Date.now()}`,
  }
}
