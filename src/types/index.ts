export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'CLIENT'

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'WON' | 'LOST'

export type BookingStatus = 'PENDING' | 'APPROVED' | 'RESCHEDULED' | 'CANCELLED'

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'ON_HOLD'

export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'

export type SocialPlatform = 'INSTAGRAM' | 'FACEBOOK' | 'TIKTOK' | 'LINKEDIN' | 'X'

export type PostStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'REVISION_REQUESTED'

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE'

export type PaymentMethod = 'MPESA' | 'CARD' | 'BANK_TRANSFER'

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED'

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  CLIENT: 'CLIENT',
} as const

export const SOCIAL_PLATFORMS = {
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  TIKTOK: 'TIKTOK',
  LINKEDIN: 'LINKEDIN',
  X: 'X',
} as const

export const POST_STATUSES = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  SCHEDULED: 'SCHEDULED',
  PUBLISHED: 'PUBLISHED',
  REVISION_REQUESTED: 'REVISION_REQUESTED',
} as const
