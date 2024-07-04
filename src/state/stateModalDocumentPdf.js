import { create } from 'zustand';
import { createImageUrl } from '../lib/hooks/createImageUrl';

const filesDefault={
  privacyPolicy:'/documents/privacy_policy.pdf',
  report:'/documents/Reports_test.pdf',
  rules:'/documents/rules_participation.pdf',
  statut:'/documents/Statut.pdf',
  termsOfUse:'/documents/terms_of_use.pdf',
}

function files(data) {
  return{
    privacyPolicy:data.privacyPolicy.ua?createImageUrl(data.privacyPolicy.ua):'/documents/privacy_policy.pdf',
    report:data.report?createImageUrl(data.report):'/documents/Reports_test.pdf',
    rules:'/documents/rules_participation.pdf',
    statut:'/documents/Statut.pdf',
    termsOfUse:data.termsOfUse.ua?createImageUrl(data.termsOfUse.ua):'/documents/terms_of_use.pdf',
  }
}


const stateModalDocumentPdf = create((set,get) => ({
  isOpen: false,
  files:{...filesDefault},
  document:'',
  open: (fileName) => set({ isOpen: true, document:get().files[fileName]}),
  close: () => set({ isOpen: false, document:''}),
  
  fetch: (data) => {
    set({files:{...files(data)}})
  },

}))

export default stateModalDocumentPdf