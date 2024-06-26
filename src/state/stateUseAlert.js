import { create } from 'zustand'
// type 'error'|'success';
const stateUseAlert = create((set) => ({
  isOpen: false,
  type:'error',
  open: (typeName='error') => set({ isOpen: true, type:typeName}),
  close: () => set({ isOpen: false, type:'error' }),
}))

export default stateUseAlert