import { create } from 'zustand';
import { createImageUrl } from '../lib/hooks/createImageUrl';

const filesDefault={
  privacyPolicy:'/documents/privacy_policy.pdf',
  report:'/documents/Reports_test.pdf',
  rules:'/documents/rules_participation.pdf',
  statut:'/documents/Statut.pdf',
  termsOfUse:'/documents/terms_of_use.pdf',
}

function filesUpdate({privacyPolicy,report,rules,statut,termsOfUse}) {
  const newData={}
  if(privacyPolicy?.ua){newData.privacyPolicy = createImageUrl(privacyPolicy?.ua)}
  if(report){newData.report = createImageUrl(report)}
  if(rules){newData.rules = createImageUrl(rules)}
  if(statut){newData.statut = createImageUrl(statut)}
  if(termsOfUse?.ua){newData.termsOfUse = createImageUrl(termsOfUse?.ua)}

  return newData
}


const stateModalDocumentPdf = create((set,get) => ({
  isOpen: false,
  files:{...filesDefault},
  document:'',
  open: (fileName) => set({ isOpen: true, document:get().files[fileName]}),
  close: () => set({ isOpen: false, document:''}),
  
  filesUpdate: (data) => {
    set({files:{...get().files, ...filesUpdate(data)}})
  },

}))

export default stateModalDocumentPdf