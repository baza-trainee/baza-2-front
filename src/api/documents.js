import instanceBaza2 from "./config/instance-baza2";

const documentsEndpoint = '/documents'

export async function getDocuments(){
	const res = await instanceBaza2.get(documentsEndpoint)
		return res.data
}

export async function updateDocuments(newDocuments){
	const res = await instanceBaza2.patch(documentsEndpoint, newDocuments);
		return res
}

// maximum limit of 512000 bytes"

// { 
//   report: "report.pdf",
//   statute: "statute.pdf",
//   privacyPolicy: {
//     ua: "privacy_ua.pdf"
//   },
//   termsOfUse: {
//     ua: "terms_ua.pdf"
//   }
// }