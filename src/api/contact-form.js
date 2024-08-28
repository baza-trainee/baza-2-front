import { EMAIL_ADMIN } from "../constants/constants";
import instanceBaza2 from "./config/instance-baza2";
//const EMAIL_ADMIN ='brodich_vlad@ukr.net';

export async function ContactFormService(data){

  const body =({ firstName, email, message })=>{
    return {
      "name": firstName,
      "email": email,
      "text": message,
      "to": EMAIL_ADMIN
    }
  }

	const res = await instanceBaza2.post('/feedback/sendFeedback', {...body(data)})
		return res.data
}
// {
//   "firstName": "Alex",
//   "lastName": "Popovich",
//   "email": "admin@gmail.com",
//   "phone": "+380 123 45 675 75",
//   "discord": "Mentor",
//   "linkedin": "https://ua.linkedin.com/company/baza-trainee-ukraine",
//   "specialization": "Frontend",
//   "convenient_time": "00-24",
//   "to": "admin@gmail.com"
// }
export async function MentorFormService(data){

  const body =({ firstName, lastName, email, phone, discord, linkedin, specialization, convenient_time})=>{
    return {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "phone": phone,
      "discord": discord,
      "linkedin": linkedin,
      "specialization": specialization,
      "convenient_time": convenient_time,
      "to": EMAIL_ADMIN
    }
  }

	const res = await instanceBaza2.post('/feedback/mentor', {...body(data)})
		return res
}