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