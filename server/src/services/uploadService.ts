import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createHash, randomBytes } from 'node:crypto'
import multer from 'multer'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    // Decode original filename for OSS object key usage elsewhere
    const originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    )
    const safeBase = path.basename(originalname)
    const ext = path.extname(safeBase)

    // Generate a unique, short hash-based filename for local disk storage
    const salt = randomBytes(16)
    const hash = createHash('sha256')
      .update(safeBase)
      .update(Date.now().toString())
      .update(salt)
      .digest('hex')
      .slice(0, 16)

    const uniqueDiskName = `${hash}${ext}`
    cb(null, uniqueDiskName)
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
