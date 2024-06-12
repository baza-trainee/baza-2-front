import { create } from 'zustand';
// member
const stateRegistrationFormModal = create((set) => ({
  isOpen: false,
  type:'mentor',
  open: (typeName='mentor') => set({ isOpen: true, type:typeName}),
  close: () => set({ isOpen: false, type:'mentor'}),
}))

export default stateRegistrationFormModal