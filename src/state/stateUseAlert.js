import { create } from 'zustand'

const stateUseAlert = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default stateUseAlert