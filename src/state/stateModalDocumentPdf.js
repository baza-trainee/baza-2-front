import { create } from 'zustand';
//Reports_test  https://baza2.crabdance.com/api/v1/docs/
const filesDefault={
  privacyPolicy:'/documents/privacy_policy.pdf',
  reports:'/documents/Reports_test.pdf',
  rules:'/documents/rules_participation.pdf',
  statut:'/documents/Statut.pdf',
  termsOfUse:'/documents/terms_of_use.pdf',
}

const stateModalDocumentPdf = create((set,get) => ({
  isOpen: false,
  files:{...filesDefault},
  document:'',
  open: (fileName) => set({ isOpen: true, document:get().files[fileName]}),
  close: () => set({ isOpen: false, document:''}),
}))

export default stateModalDocumentPdf