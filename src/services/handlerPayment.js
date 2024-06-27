import axios from "axios";
import { BASE_URL } from "../constants/constants";
// !! Логіка запиту на старий бекенд на отримання посилання сторінки оплати. !!
//const BASE_URL = 'https://baza-trainee-landing.vercel.app/api/v1';

export default function handlerPayment(payment="0", locale="ua", callback=()=>{}){
	// !! Умова для тестування помилок!!
	const paymentAmount = payment === "123" ? 'h' : payment;

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
		if (response.data?.invoiceUrl) {
			//window.location.href = response.data.invoiceUrl;
			window.open(response.data.invoiceUrl);
			callback('ok')
		}else callback('error')
  })
  .catch(function (error) {
		console.log(error)
		callback('error')
  });
}