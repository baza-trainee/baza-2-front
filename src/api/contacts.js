import instanceBaza2 from "./config/instance-baza2";

const contactsEndpoint = '/contacts'

export async function getContacts(){
	const res = await instanceBaza2.get(contactsEndpoint)
		return res.data
}

// Example Value Schema
// {
//   "contactsDataList": {
//     "phone1": 380123456789,
//     "phone2": 380123456789,
//     "email": "example@example.com"
//   },
//   "socialsMediaList": {
//     "linkedin": "https://www.linkedin.com/in/example",
//     "facebook": "https://www.facebook.com/example",
//     "telegram": "https://t.me/+CBXkAASfvJl"
//   }
// }

export async function updateContacts(contacts){
	const res = await instanceBaza2.patch(contactsEndpoint, contacts);
		return res
}