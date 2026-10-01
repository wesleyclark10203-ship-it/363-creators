export interface STKPushOptions {
  phoneNumber: string // Format e.g. 254712345678
  amount: number
  accountReference: string // e.g. Invoice Number INV-363-001
  transactionDesc: string
}

export interface STKPushResponse {
  success: boolean
  checkoutRequestID?: string
  customerMessage?: string
  error?: string
  isMock: boolean
}

export async function initiateMpesaSTKPush(options: STKPushOptions): Promise<STKPushResponse> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET
  const passkey = process.env.MPESA_PASSKEY
  const shortcode = process.env.MPESA_SHORTCODE || '174379'

  // Format phone number to 254XXXXXXXXX
  let phone = options.phoneNumber.replace(/[^0-9]/g, '')
  if (phone.startsWith('0')) {
    phone = '254' + phone.slice(1)
  } else if (phone.startsWith('+')) {
    phone = phone.slice(1)
  }

  console.log(`[M-PESA DARAJA SERVICE] Initiating STK Push for ${phone} - Amount: KSh ${options.amount} - Account: ${options.accountReference}`)

  // If Daraja Credentials are fully configured
  if (consumerKey && consumerSecret && passkey) {
    try {
      // 1. Get OAuth Token
      const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
      const envUrl = process.env.MPESA_ENV === 'production' 
        ? 'https://api.safaricom.co.ke' 
        : 'https://sandbox.safaricom.co.ke'

      const tokenRes = await fetch(`${envUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: { Authorization: `Basic ${auth}` },
      })
      const tokenData = await tokenRes.json()

      if (!tokenData.access_token) {
        throw new Error('Failed to generate M-Pesa access token')
      }

      // 2. Generate Timestamp & Password
      const date = new Date()
      const timestamp = date.getFullYear() +
        String(date.getMonth() + 1).padStart(2, '0') +
        String(date.getDate()).padStart(2, '0') +
        String(date.getHours()).padStart(2, '0') +
        String(date.getMinutes()).padStart(2, '0') +
        String(date.getSeconds()).padStart(2, '0')

      const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

      // 3. Send STK Push Request
      const callbackUrl = process.env.MPESA_CALLBACK_URL || 'http://localhost:3000/api/payments/mpesa/callback'
      
      const stkRes = await fetch(`${envUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: options.amount,
          PartyA: phone,
          PartyB: shortcode,
          PhoneNumber: phone,
          CallBackURL: callbackUrl,
          AccountReference: options.accountReference,
          TransactionDesc: options.transactionDesc || '363 Creators Invoice Payment',
        }),
      })

      const stkData = await stkRes.json()
      if (stkData.ResponseCode === '0') {
        return {
          success: true,
          checkoutRequestID: stkData.CheckoutRequestID,
          customerMessage: stkData.CustomerMessage || 'STK Push sent to your mobile phone. Please enter M-Pesa PIN.',
          isMock: false,
        }
      } else {
        return {
          success: false,
          error: stkData.ResponseDescription || 'M-Pesa STK Push Request failed.',
          isMock: false,
        }
      }
    } catch (err: any) {
      console.error('[M-PESA DARAJA ERROR]', err)
      return { success: false, error: err.message, isMock: false }
    }
  }

  // Development Simulation / Mock Mode
  const mockCheckoutID = `ws_CO_MOCK_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  return {
    success: true,
    checkoutRequestID: mockCheckoutID,
    customerMessage: `[DEMO MODE] M-Pesa prompt simulated for ${phone}. Click confirm to simulate PIN entry.`,
    isMock: true,
  }
}
