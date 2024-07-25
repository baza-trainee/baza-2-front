import instanceBaza2 from './config/instance-baza2';
// [
//   {
//     "name": {
//       "en": "string",
//       "pl": "string",
//       "ua": "string"
//     },
//     "review": {
//       "en": "string",
//       "pl": "string",
//       "ua": "string"
//     },
//     "role": "string",
//     "date": 0,
//     "imageUrl": "string"
//   }
// ]
const testimonialsEndpoint = '/testimonials'

export async function  getAllTestimonials(){
	try {
		const res = await instanceBaza2.get(testimonialsEndpoint)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
// name[en]
// string
// Name in English

// name[pl]
// string
// Name in Polish

// name[ua]
// string
// Name in Ukrainian

// review[en]
// string
// Review in English

// review[pl]
// string
// Review in Polish

// review[ua]
// string
// Review in Ukrainian

// role
// string
// Author's specialization

// date
// number
// Date of the testimonial

// file
// file($binary)
// Testimonial image file (JPG, PNG, WEBP)


export async function  createNewtesTestimonial(newTestimonial){
	try {
		const res = await instanceBaza2.post(testimonialsEndpoint, newTestimonial, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getTestimonialById(id){
	try {
		const res = await instanceBaza2.get(`${testimonialsEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deleteTestimonialById(id){
	try {
		const res = await instanceBaza2.delete(`${testimonialsEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updateTestimonialById(id, updTestimonial){
	try {
		const res = await instanceBaza2.patch(`${testimonialsEndpoint}/${id}`, updTestimonial, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}