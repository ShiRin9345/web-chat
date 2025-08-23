import { create } from 'zustand/react'

export type groupColumnType = {
  open: boolean
  changeOpen: () => void
}

export const useGroupColumnStore = create<groupColumnType>((set) => ({
  open: true,
  changeOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}))
