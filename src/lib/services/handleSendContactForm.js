import axios from 'axios';

const BASE_URL = 'https://baza2.crabdance.com/api/v1';
const EMAIL_ADMIN ='brodich_vlad@ukr.net';

export default function handleSendContactForm(data, callback=()=>{}) {

  const body =({ firstName, email, message })=>{
    return {
      "name": firstName,
      "email": email,
      "text": message,
      "to": EMAIL_ADMIN
    }
  }

  axios.post(`${BASE_URL}/feedback/sendFeedback`, {
    ...body(data)
  })
  .then(function (response) {
    if (response.status === 200) {
			callback('ok')
		}else callback('error')
  })
  .catch(function (error) {
    console.log(error)
    callback('error')
  });
}