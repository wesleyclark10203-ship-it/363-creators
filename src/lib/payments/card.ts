export interface CardPaymentOptions {
  amount: number
  currency: string
  invoiceNumber: string
  email: string
}

export async function processCardPayment(options: CardPaymentOptions) {
  console.log(`[CARD PAYMENT ABSTRACTION] Processing KSh ${options.amount} for invoice ${options.invoiceNumber}`)
  
  // Card gateway integration spot (Stripe / Flutterwave / Pesapal)
  return {
    success: true,
    transactionRef: `CARD-REF-${Date.now()}`,
    status: 'COMPLETED',
    isMock: true,
  }
}
