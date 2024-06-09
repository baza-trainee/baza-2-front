import axios from "axios";
// !! Логіка запиту на старий бекенд на отримання посилання сторінки оплати. !!
const BASE_URL = 'https://baza-trainee-landing.vercel.app/api/v1';

export default function handlePayment(payment="0", locale="ua", callback=()=>{}){
	const paymentAmount = payment === "0" ? '1' : payment;

	// !! Умова для тестування помилок!!
	if(payment==="123"){
		callback({error:'error'})
		return
	}

	const paymentData = {
		transactionType: 'CREATE_INVOICE',
		merchantDomainName: window.location.hostname,
		apiVersion: 1,
		orderReference: Date.now().toString(),
		orderDate: Date.now(),// дата.
		amount: Number(paymentAmount), // сума.
		language: locale, // мова сторінки оплати.
		currency: 'UAH',// валюта.
		productName: ['Baza trainee support'],// наза товару.
		productCount: [1], // кількість товару.
		productPrice: [Number(paymentAmount)], // ціна за одиницю товару.
		serviceUrl: 'https://baza-trainee.tech/api/v1/payment/complete',
	}

  axios.post(`${BASE_URL}/payment`, {...paymentData})
  .then(function (response) {
		if (response.data.invoiceUrl) {
			window.location.href = response.data.invoiceUrl;
		}
    callback(response)
  })
  .catch(function (error) {
    callback(error)
  });





	// try {
	// 	const response = await axios.post(`${urlBase}/payment`, {...paymentData})
	// 	callback(response)
	// } catch (error) {
	// 	callback({error:error})
	// 	console.log(error);
	// }
}