import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import multer from 'multer'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads')
    cb(null, dir)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    )
    console.log(originalname)
    cb(null, originalname)
  },
})

export const upload = multer({
  storage,

  limits: {
    fileSize: 1024 * 1024 * 1024,
    files: 1,
    fields: 1,
  },
})
