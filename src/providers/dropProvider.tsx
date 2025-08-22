import React, { createContext } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import { chatInputMutateOptions } from '@/features/reactQuery/options.ts'
import { scrollBottom } from '@/lib/scroll.ts'

export const DropContext = createContext<boolean>(false)
interface DropProviderProps {
  children: React.ReactNode
  groupId?: string
  conversationId?: string
  friendUserId?: string
}
const DropProvider: React.FC<DropProviderProps> = ({
  children,
  groupId,
  conversationId,
  friendUserId,
}) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(
    chatInputMutateOptions({
      queryClient,
      conversationId,
      friendUserId,
      groupId,
    }),
  )

  const onDrop = async (uploadFiles: Array<File>) => {
    const file = uploadFiles[0]
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
    await mutateAsync({ content: targetUrl, type: 'IMAGE' })
    scrollBottom()
  }

  const { getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'],
    },
    noDragEventsBubbling: true,
    onDrop,
  })

  return (
    <DropContext.Provider value={isDragActive}>
      <div {...getRootProps()}>{children}</div>
    </DropContext.Provider>
  )
}
export default DropProvider
