import { create } from 'zustand';
// partaker
const stateModalDocumentPdf = create((set) => ({
  isOpen: false,
  document:'',
  open: (documentName) => set({ isOpen: true, document:documentName}),
  close: () => set({ isOpen: false, type:''}),
}))

export default stateModalDocumentPdf