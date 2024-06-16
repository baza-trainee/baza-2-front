import { create } from 'zustand';
// partaker
const stateRegistrationFormModal = create((set) => ({
  isOpen: false,
  type:'mentor',
  open: (typeName) => set({ isOpen: true, type:typeName}),
  close: () => set({ isOpen: false, type:'mentor'}),
}))

export default stateRegistrationFormModal