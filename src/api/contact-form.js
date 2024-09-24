import instanceBazaCrm from "./config/instance-baza-crm";
import instanceBaza2 from "./config/instance-baza2";
// Пошта адміністратора !! змінити на актуальну .env !!
// export const EMAIL_ADMIN ='brodich_vlad@ukr.net';
const EMAIL_ADMIN = process.env.NEXT_PUBLIC_EMAIL_ADMIN

// Форма фідбек
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

// Форма ментора
//  Схема {
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

  const body =({ 
    firstName, 
    lastName, 
    email, 
    phone, 
    discord, 
    linkedin, 
    specialization, 
    convenient_time
  })=>{
    return {
      firstName,
      lastName,
      email,
      phone,
      discord,
      linkedin,
      specialization,
      convenient_time,
      to: EMAIL_ADMIN
    }
  }

	const res = await instanceBaza2.post('/feedback/mentor', {...body(data)})
		return res
}

// Форма учасника
// Схема {
//   "city": "Lviv" *,
//   "country": "Ukraine" *,
//   "discord": "admin#4536" *,
//   "email": "admin@gmail.com" *,
//   "firstName": "Adam" *,
//   "lastName": "Smasher" *,
//   "linkedin": "link" *,
//   "phone": "+380 565 454 352" *,
//   "specialization": "Backend" *

//    experience: 'string',
//    motivation: 'string',
//    sawQuestionnaire: 'string'
// }

export async function PartakerFormService(data){

  const body =({ 
    firstName, 
    lastName, 
    email, 
    phone, 
    city,
    country,
    discord, 
    linkedin, 
    experience,
    specialization, 
    motivation,
    sawQuestionnaire
  })=>{

  const newBoody = {      
    firstName, 
    lastName, 
    email, 
    phone, 
    city,
    country,
    discord, 
    linkedin, 
    specialization, 

    experience,
    motivation,
    sawQuestionnaire
  }    
    return newBoody
  }

	const res = await instanceBazaCrm.post('/userRequest', {...body(data)})
		return res
}