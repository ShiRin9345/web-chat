const { PrismaClient } = require('@prisma/client')

const db = globalThis.prisma || new PrismaClient()
module.exports = db

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}
