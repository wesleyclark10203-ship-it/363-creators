import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ROLES, type Role } from '@/types'
import { db } from './db'

const AUTH_COOKIE_NAME = '363_auth_token'
const JWT_SECRET = process.env.AUTH_SECRET || 'super-secret-jwt-key-change-this-in-production-min-32-chars'

export interface JWTPayload {
  userId: string
  email: string
  role: Role
  name: string
  clientProfileId?: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export async function removeAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

export async function getCurrentUser(): Promise<{
  user: JWTPayload | null
  clientProfileId?: string
}> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      return { user: null }
    }

    const payload = verifyToken(token)
    if (!payload) {
      return { user: null }
    }

    // Fetch fresh user data if needed
    const dbUser = await db.user.findUnique({
      where: { id: payload.userId },
      include: { clientProfile: true },
    })

    if (!dbUser) {
      return { user: null }
    }

    return {
      user: {
        userId: dbUser.id,
        email: dbUser.email,
        role: dbUser.role as Role,
        name: dbUser.name,
        clientProfileId: dbUser.clientProfile?.id,
      },
      clientProfileId: dbUser.clientProfile?.id,
    }
  } catch (e) {
    return { user: null }
  }
}

export async function requireAuth() {
  const { user } = await getCurrentUser()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== ROLES.SUPER_ADMIN && user.role !== ROLES.ADMIN) {
    throw new Error('FORBIDDEN_ADMIN_ONLY')
  }
  return user
}

export async function requireClient() {
  const user = await requireAuth()
  if (user.role !== ROLES.CLIENT) {
    throw new Error('FORBIDDEN_CLIENT_ONLY')
  }
  return user
}
