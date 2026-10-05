export const DEFAULT_WHATSAPP_NUMBER = '254707311381'
export const DEFAULT_ENQUIRY_MESSAGE = 'Hello 363 Creators! I would like to make an enquiry about your services.'

export function getWhatsAppUrl(customMessage?: string): string {
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER
  const message = customMessage || DEFAULT_ENQUIRY_MESSAGE
  return `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`
}
