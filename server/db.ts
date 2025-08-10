import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '../generated/client.js'

const db = new PrismaClient().$extends(withAccelerate())
export default db
