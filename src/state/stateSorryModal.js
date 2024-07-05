import { create } from 'zustand'

const stateSorryModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default stateSorryModal