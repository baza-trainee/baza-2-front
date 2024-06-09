import axios from 'axios';

const BASE_URL = 'http://185.161.208.63:3001/api/v1';
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
    callback(response)
  })
  .catch(function (error) {
    callback(error)
  });
}