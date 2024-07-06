import instanceBaza2 from "./config/instance-baza2";

export async function getContacts(){
	try {
		const res = await instanceBaza2.get('/contacts')
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
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
	try {
		const res = await instanceBaza2.patch('/contacts', contacts);
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}