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

type UploadStore = {
  uploadProgress: Map<string, UploadProgress>
  isUploading: Map<string, boolean>
  eventSources: Map<string, EventSource>
  files: Array<File>

  setProgress: (key: string, data: UploadProgress) => void
  setUploading: (key: string, uploading: boolean) => void
  addEventSource: (key: string, es: EventSource) => void
  removeEventSource: (key: string) => void
  closeAllEventSources: () => void
  setFiles: (files: Array<File>) => void
  addFiles: (newFiles: Array<File>) => void
  removeFile: (fileName: string) => void
  reset: () => void
}

export const useUploadStore = create<UploadStore>((set, get) => ({
  uploadProgress: new Map(),
  isUploading: new Map(),
  eventSources: new Map(),
  files: [],

  setProgress: (key, data) =>
    set((state) => {
      const map = new Map(state.uploadProgress)
      map.set(key, data)
      return { uploadProgress: map }
    }),

  setUploading: (key, uploading) =>
    set((state) => {
      const map = new Map(state.isUploading)
      map.set(key, uploading)
      return { isUploading: map }
    }),

  addEventSource: (key, es) =>
    set((state) => {
      const map = new Map(state.eventSources)
      map.set(key, es)
      return { eventSources: map }
    }),

  removeEventSource: (key) =>
    set((state) => {
      const map = new Map(state.eventSources)
      const es = map.get(key)
      if (es) {
        try {
          es.close()
        } catch {}
      }
      map.delete(key)
      return { eventSources: map }
    }),

  closeAllEventSources: () => {
    const { eventSources } = get()
    eventSources.forEach((es) => {
      try {
        es.close()
      } catch {}
    })
    set({ eventSources: new Map() })
  },

  setFiles: (files) => set({ files }),

  addFiles: (newFiles) =>
    set((state) => {
      const existingFiles = state.files
      const filteredNewFiles = newFiles.filter(
        (newFile) =>
          !existingFiles.some(
            (existingFile) => existingFile.name === newFile.name,
          ),
      )
      return { files: [...existingFiles, ...filteredNewFiles] }
    }),

  removeFile: (fileName) =>
    set((state) => ({
      files: state.files.filter((file) => file.name !== fileName),
    })),

  reset: () =>
    set({
      uploadProgress: new Map(),
      isUploading: new Map(),
      eventSources: new Map(),
      files: [],
    }),
}))
