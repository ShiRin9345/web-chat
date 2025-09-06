import db from '../db.ts'
import { generateCode } from './generateCode.ts'

export const FIRST_GROUP_NAME = 'ALL'
export let firstGroupId: string

export const initialDb = async () => {
  try {
    let firstGroup = await db.group.findFirst({
      where: {
        name: FIRST_GROUP_NAME,
      },
    })
    if (!firstGroup) {
      let code = ''
      let existing: any = null
      do {
        code = generateCode(2000000, 3000000)
        existing = await db.group.findUnique({ where: { code } })
      } while (existing)

      firstGroup = await db.group.create({
        data: {
          name: FIRST_GROUP_NAME,
          code,
        },
      })
    }
    firstGroupId = firstGroup.id
  } catch (e: any) {
    throw new Error('Failed to initialize database: ' + e.message)
  }
}
