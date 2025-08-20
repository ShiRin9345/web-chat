import { create } from 'zustand/react'

export type UserColumnType = 'ADD_USER' | 'GROUPS'

export type UserColumnState = {
  type: UserColumnType
  setType: (type: UserColumnType) => void
}

export const useColumnStore = create<UserColumnState>((set) => ({
  type: 'GROUPS',
  setType: (type: UserColumnType) => set({ type }),
}))
