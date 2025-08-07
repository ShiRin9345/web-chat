import { create } from 'zustand/react'

type ChatState = {
  messages: Array<string>
  addMessage: (message: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: ['initial message'],
  addMessage: (message: string) =>
    set((state) => ({ messages: [...state.messages, message] })),
}))
