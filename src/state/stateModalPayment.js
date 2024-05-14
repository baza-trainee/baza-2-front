import { create } from 'zustand';

const stateModalPayment = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default stateModalPayment