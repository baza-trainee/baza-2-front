import { create } from 'zustand';

const stateRegistrationFormModal = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default stateRegistrationFormModal