import { create } from 'zustand'

const stateErrorAlert = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default stateErrorAlert