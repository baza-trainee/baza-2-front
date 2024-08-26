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
	const res = await instanceBaza2.get(herosliderEndpoint)
		return res.data
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
export async function createNewSlide(newSlider){
	const res = await instanceBaza2.post(herosliderEndpoint, newSlider, {
    headers: { 'Content-Type': 'multipart/form-data' }})
		return res
}

export async function getSlideById(id){
	const res = await instanceBaza2.get(`${herosliderEndpoint}/${id}`);
		return res.data
}

export async function updateSlideById(id, updSlide){
	const res = await instanceBaza2.patch(`${herosliderEndpoint}/${id}`, updSlide, {
    headers: { 'Content-Type': 'multipart/form-data' }});
		return res
}

export async function deleteSlideById(id){
	const res = await instanceBaza2.delete(`${herosliderEndpoint}/${id}`);
		return res
}