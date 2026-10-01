import { PrismaClient } from '@prisma/client'
import path from 'path'

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'
  if (envUrl.startsWith('file:')) {
    const rawPath = envUrl.replace(/^file:/, '').trim()
    const cleanPath = rawPath.startsWith('./') ? rawPath.substring(2) : rawPath
    
    // Resolve absolute path to ensure serverless functions find dev.db
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
