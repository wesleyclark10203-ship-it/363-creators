import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'
  if (envUrl.startsWith('file:')) {
    const rawPath = envUrl.replace(/^file:/, '').trim()
    const cleanPath = rawPath.startsWith('./') ? rawPath.substring(2) : rawPath

    // In Netlify / Serverless environments, /var/task is read-only.
    // Copy SQLite database file to /tmp directory which is writable.
    const isServerless = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL
    if (isServerless && fs.existsSync('/tmp')) {
      const tmpDbPath = '/tmp/dev.db'
      const sourceDbPath = path.isAbsolute(cleanPath)
        ? cleanPath
        : path.join(process.cwd(), cleanPath.includes('prisma') ? cleanPath : path.join('prisma', cleanPath))

      try {
        if (!fs.existsSync(tmpDbPath) && fs.existsSync(sourceDbPath)) {
          fs.copyFileSync(sourceDbPath, tmpDbPath)
        }
      } catch (e) {
        console.error('Error copying SQLite file to /tmp:', e)
      }

      if (fs.existsSync(tmpDbPath)) {
        return `file:${tmpDbPath}`
      }
    }

    let finalPath = path.isAbsolute(cleanPath)
      ? cleanPath
      : path.join(process.cwd(), cleanPath)

    if (!finalPath.includes('prisma')) {
      finalPath = path.join(process.cwd(), 'prisma', 'dev.db')
    }

    return `file:${finalPath}`
  }
  return envUrl
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
