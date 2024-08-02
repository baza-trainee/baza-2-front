import instanceBaza2 from "./config/instance-baza2"

// Example Value Schema
// {
//   "results": [
//     {
//       "title": {
//         "en": "string",
//         "pl": "string",
//         "ua": "string"
//       },
//       "subtitle": {
//         "en": "string",
//         "pl": "string",
//         "ua": "string"
//       },
//       "imageUrl": "string"
//     }
//   ],
//   "info": {
//     "totalSlides": 0,
//     "maxSlides": 0
//   }
// }
const herosliderEndpoint = '/heroslider'

export async function getAllSliders(){
	try {
		const res = await instanceBaza2.get(herosliderEndpoint)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
// Example Value Schema
// {
//   "title": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "subtitle": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "imageUrl": "string"
// }
export async function createNewSliders(newSlider){
	try {
		const res = await instanceBaza2.post(herosliderEndpoint, newSlider, {
      headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function getById(id){
	try {
		const res = await instanceBaza2.get(`${herosliderEndpoint}/${id}`);
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function updateSlideById(id,updSlide){
	try {
		const res = await instanceBaza2.patch(`${herosliderEndpoint}/${id}`, updSlide, {
      headers: { 'Content-Type': 'multipart/form-data' }});
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}