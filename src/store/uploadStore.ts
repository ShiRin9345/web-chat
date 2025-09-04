import { create } from 'zustand'

export type UploadProgress = {
  fileName: string
  progress: number
  fileSize: number
  uploadedBytes: number
  speed: number
  estimatedTimeLeft: number
  [key: string]: any
}

export type ConversationUpload = {
  uploadProgress: Map<string, UploadProgress>
  isUploading: Map<string, boolean>
  eventSources: Map<string, EventSource>
  files: Array<File>
  uploadIdToFileName: Map<string, string>
}

type UploadStore = {
  // conversationId -> ConversationUpload
  conversations: Map<string, ConversationUpload>

  getConversationUpload: (conversationId: string) => ConversationUpload
  setProgress: (
    conversationId: string,
    uploadId: string,
    data: UploadProgress,
  ) => void
  setUploading: (
    conversationId: string,
    uploadId: string,
    uploading: boolean,
  ) => void
  addEventSource: (
    conversationId: string,
    uploadId: string,
    es: EventSource,
  ) => void
  removeEventSource: (conversationId: string, uploadId: string) => void
  removeProgress: (conversationId: string, uploadId: string) => void
  addFiles: (conversationId: string, newFiles: Array<File>) => void
  removeFile: (conversationId: string, fileName: string) => void
  bindUploadId: (
    conversationId: string,
    uploadId: string,
    fileName: string,
  ) => void
  removeFileByUploadId: (conversationId: string, uploadId: string) => void
  closeConversationEventSources: (conversationId: string) => void
  resetConversation: (conversationId: string) => void
  reset: () => void
}

// 创建空的 ConversationUpload
const createEmptyConversationUpload = (): ConversationUpload => ({
  uploadProgress: new Map(),
  isUploading: new Map(),
  eventSources: new Map(),
  files: [],
  uploadIdToFileName: new Map(),
})

export const useUploadStore = create<UploadStore>((set, get) => ({
  conversations: new Map(),

  getConversationUpload: (conversationId) => {
    const { conversations } = get()
    if (!conversations.has(conversationId)) {
      set((state) => ({
        conversations: new Map(state.conversations).set(
          conversationId,
          createEmptyConversationUpload(),
        ),
      }))
      return createEmptyConversationUpload()
    }
    return conversations.get(conversationId)!
  },

  setProgress: (conversationId, uploadId, data) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation =
        conversations.get(conversationId) || createEmptyConversationUpload()
      const uploadProgress = new Map(conversation.uploadProgress)
      uploadProgress.set(uploadId, data)

      conversations.set(conversationId, {
        ...conversation,
        uploadProgress,
      })

      return { conversations }
    }),

  setUploading: (conversationId, uploadId, uploading) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation =
        conversations.get(conversationId) || createEmptyConversationUpload()
      const isUploading = new Map(conversation.isUploading)
      isUploading.set(uploadId, uploading)

      conversations.set(conversationId, {
        ...conversation,
        isUploading,
      })

      return { conversations }
    }),

  addEventSource: (conversationId, uploadId, es) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation =
        conversations.get(conversationId) || createEmptyConversationUpload()
      const eventSources = new Map(conversation.eventSources)
      eventSources.set(uploadId, es)

      conversations.set(conversationId, {
        ...conversation,
        eventSources,
      })

      return { conversations }
    }),

  removeEventSource: (conversationId, uploadId) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation = conversations.get(conversationId)
      if (!conversation) return state

      const eventSources = new Map(conversation.eventSources)
      const es = eventSources.get(uploadId)
      if (es) {
        try {
          es.close()
        } catch {}
      }
      eventSources.delete(uploadId)

      conversations.set(conversationId, {
        ...conversation,
        eventSources,
      })

      return { conversations }
    }),

  removeProgress: (conversationId, uploadId) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation = conversations.get(conversationId)
      if (!conversation) return state

      const uploadProgress = new Map(conversation.uploadProgress)
      const isUploading = new Map(conversation.isUploading)

      uploadProgress.delete(uploadId)
      isUploading.delete(uploadId)

      conversations.set(conversationId, {
        ...conversation,
        uploadProgress,
        isUploading,
      })

      return { conversations }
    }),

  addFiles: (conversationId, newFiles) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation =
        conversations.get(conversationId) || createEmptyConversationUpload()
      const existingFiles = conversation.files
      const filteredNewFiles = newFiles.filter(
        (newFile) =>
          !existingFiles.some(
            (existingFile) => existingFile.name === newFile.name,
          ),
      )

      conversations.set(conversationId, {
        ...conversation,
        files: [...existingFiles, ...filteredNewFiles],
      })

      return { conversations }
    }),

  removeFile: (conversationId, fileName) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation = conversations.get(conversationId)
      if (!conversation) return state

      conversations.set(conversationId, {
        ...conversation,
        files: conversation.files.filter((file) => file.name !== fileName),
      })

      return { conversations }
    }),

  bindUploadId: (conversationId, uploadId, fileName) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation =
        conversations.get(conversationId) || createEmptyConversationUpload()
      const uploadIdToFileName = new Map(conversation.uploadIdToFileName)
      uploadIdToFileName.set(uploadId, fileName)

      conversations.set(conversationId, {
        ...conversation,
        uploadIdToFileName,
      })

      return { conversations }
    }),

  removeFileByUploadId: (conversationId, uploadId) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation = conversations.get(conversationId)
      if (!conversation) return state

      const uploadIdToFileName = new Map(conversation.uploadIdToFileName)
      const fileName = uploadIdToFileName.get(uploadId)
      if (!fileName) return state

      uploadIdToFileName.delete(uploadId)

      conversations.set(conversationId, {
        ...conversation,
        files: conversation.files.filter((file) => file.name !== fileName),
        uploadIdToFileName,
      })

      return { conversations }
    }),

  closeConversationEventSources: (conversationId) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation = conversations.get(conversationId)
      if (!conversation) return state

      conversation.eventSources.forEach((es) => {
        try {
          es.close()
        } catch {}
      })

      conversations.set(conversationId, {
        ...conversation,
        eventSources: new Map(),
      })

      return { conversations }
    }),

  resetConversation: (conversationId) =>
    set((state) => {
      const conversations = new Map(state.conversations)
      const conversation = conversations.get(conversationId)
      if (conversation) {
        conversation.eventSources.forEach((es) => {
          try {
            es.close()
          } catch {}
        })
      }

      conversations.set(conversationId, createEmptyConversationUpload())
      return { conversations }
    }),

  reset: () =>
    set((state) => {
      state.conversations.forEach((conversation) => {
        conversation.eventSources.forEach((es) => {
          try {
            es.close()
          } catch {}
        })
      })
      return { conversations: new Map() }
    }),
}))
