import { Wallpaper } from 'lucide-react'
import { useRef } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import { profileWallpaperMutationOptions } from '@/features/reactQuery/options.ts'

const WallpaperUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    profileWallpaperMutationOptions({ queryClient }),
  )
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    const response = await axios.get<OssInfo>('/api/oss-signature')
    const ossInfo = response.data
    const formdata = new FormData()

    formdata.append('key', file.name)
    formdata.append('OSSAccessKeyId', ossInfo.OSSAccessKeyId)
    formdata.append('policy', ossInfo.policy)
    formdata.append('signature', ossInfo.Signature)
    formdata.append('success_action_status', '200')
    formdata.append('file', file)
    await axios.post(ossInfo.host, formdata)
    const targetUrl = ossInfo.host + '/' + file.name
    mutate(targetUrl)
  }
  return (
    <button onClick={() => inputRef.current?.click()}>
      <Wallpaper />
      <input
        ref={inputRef}
        className="invisible w-0"
        type="file"
        onChange={handleChange}
      />
    </button>
  )
}
export default WallpaperUpload
