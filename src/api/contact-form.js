import instanceBaza2 from "./config/instance-baza2";
// Пошта адміністратора !! змінити на актуальну .env !!
// export const EMAIL_ADMIN ='brodich_vlad@ukr.net';
const EMAIL_ADMIN = process.env.NEXT_PUBLIC_EMAIL_ADMIN

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
    firstName: firstName,
    lastName: lastName,
    specialization: specialization,
    email: email,
    phone: phone,
    discord: discord,
    linkedin: linkedin,
    experience: experience,
    motivation: motivation,
    sawQuestionnaire: sawQuestionnaire
  }   
  if(city){newBoody.city = city} 
  if(country){newBoody.country = country}  
    return newBoody
  }

  const res = setTimeout(()=>{
    console.log({...body(data)});
  },3000)
  return res
	// const res = await instanceBaza2.post('/feedback/mentor', {...body(data)})
	// 	return res
}