import { Wallpaper } from 'lucide-react'
import { useRef, useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import imageCompression from 'browser-image-compression'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import { profileWallpaperMutationOptions } from '@/features/reactQuery/options.ts'

const WallpaperUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const [isProcessing, setIsProcessing] = useState(false)
  const { mutate } = useMutation(
    profileWallpaperMutationOptions({ queryClient }),
  )
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setIsProcessing(true)

    try {
      const file = e.target.files[0]

      // 压缩和转换为WebP格式
      const options = {
        maxSizeMB: 1, // 最大文件大小1MB
        maxWidthOrHeight: 1920, // 最大宽度或高度1920px
        useWebWorker: true, // 使用Web Worker提升性能
        fileType: 'image/webp', // 输出WebP格式
      }

      console.log('开始压缩图片...')
      const compressedFile = await imageCompression(file, options)
      console.log('图片压缩完成:', {
        原始大小: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        压缩后大小: `${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
        压缩比例: `${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`,
      })

      // 生成唯一的文件名
      const timestamp = Date.now()
      const fileName = `wallpaper_${timestamp}.webp`

      // 上传压缩后的WebP文件
      const response = await axios.get<OssInfo>('/api/oss-signature')
      const ossInfo = response.data
      const formdata = new FormData()

      formdata.append('key', fileName)
      formdata.append('OSSAccessKeyId', ossInfo.OSSAccessKeyId)
      formdata.append('policy', ossInfo.policy)
      formdata.append('signature', ossInfo.Signature)
      formdata.append('success_action_status', '200')
      formdata.append('file', compressedFile)

      await axios.post(ossInfo.host, formdata)
      const targetUrl = ossInfo.host + '/' + fileName
      mutate(targetUrl)
    } catch (error) {
      try {
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
      } catch (fallbackError) {
        console.error('原文件上传也失败:', fallbackError)
      }
    } finally {
      setIsProcessing(false)
    }
  }
  return (
    <button
      className="cursor-pointer text-gray-700 dark:text-gray-300 orange:text-orange-700 hover:text-gray-900 dark:hover:text-white orange:hover:text-orange-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => inputRef.current?.click()}
      disabled={isProcessing}
      title={isProcessing ? '处理中...' : '更换背景'}
    >
      {isProcessing ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <Wallpaper />
      )}
      <input
        ref={inputRef}
        className="invisible w-0"
        type="file"
        onChange={handleChange}
        accept="image/*"
      />
    </button>
  )
}
export default WallpaperUpload
