import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { name, companyName, email, phone, password } = await req.json()

    if (!name || !companyName || !email || !password) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 })
    }

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    const newUser = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name,
        passwordHash,
        role: 'CLIENT',
        clientProfile: {
          create: {
            companyName,
            phone,
          },
        },
      },
      include: { clientProfile: true },
    })

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role as any,
      name: newUser.name,
      clientProfileId: newUser.clientProfile?.id,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        clientProfileId: newUser.clientProfile?.id,
      },
    })

    response.cookies.set('363_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}
