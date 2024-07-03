import { create } from 'zustand';

const stateModalDocumentPdf = create((set) => ({
  isOpen: false,
  document:'',
  open: (documentName) => set({ isOpen: true, document:documentName}),
  close: () => set({ isOpen: false, document:''}),
}))

export default stateModalDocumentPdf