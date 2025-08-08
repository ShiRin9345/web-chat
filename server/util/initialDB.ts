import db from '../db.ts'

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
      firstGroup = await db.group.create({
        data: {
          name: FIRST_GROUP_NAME,
        },
      })
    }
    firstGroupId = firstGroup.id
  } catch (e: any) {
    throw new Error('Failed to initialize database: ' + e.message)
  }
}
