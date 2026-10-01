import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'
  if (envUrl.startsWith('file:')) {
    const rawPath = envUrl.replace(/^file:/, '').trim()
    const cleanPath = rawPath.startsWith('./') ? rawPath.substring(2) : rawPath

    const isServerless = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL || process.env.NODE_ENV === 'production'
    if (isServerless && fs.existsSync('/tmp')) {
      const tmpDbPath = '/tmp/dev.db'
      const possibleSources = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
        path.join('/var/task', 'prisma', 'dev.db'),
        path.join('/var/task', 'dev.db'),
        path.resolve(cleanPath),
      ]

      let sourceFound = ''
      for (const src of possibleSources) {
        if (fs.existsSync(src)) {
          sourceFound = src
          break
        }
      }

      try {
        if (sourceFound && !fs.existsSync(tmpDbPath)) {
          fs.copyFileSync(sourceFound, tmpDbPath)
        }
      } catch (e) {
        console.error('Error copying SQLite file to /tmp:', e)
      }

      if (fs.existsSync(tmpDbPath)) {
        try {
          fs.chmodSync(tmpDbPath, 0o666)
        } catch (e) {}
        const tmpUrl = `file:${tmpDbPath}`
        process.env.DATABASE_URL = tmpUrl
        return tmpUrl
      }
    }

    let finalPath = path.isAbsolute(cleanPath)
      ? cleanPath
      : path.join(process.cwd(), cleanPath)

    if (!finalPath.includes('prisma') && !fs.existsSync(finalPath)) {
      finalPath = path.join(process.cwd(), 'prisma', 'dev.db')
    }

    const finalUrl = `file:${finalPath}`
    process.env.DATABASE_URL = finalUrl
    return finalUrl
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
