import instanceBaza2 from "./config/instance-baza2";
import { isMobile } from 'react-device-detect';

export async function PaymentService(paymentAmount="0", locale="ua"){
	
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

	try {
		const res = await instanceBaza2.post('/payment', {...paymentData})
    if (res.data?.invoiceUrl) {
			if(isMobile){
				window.location.assign(res.data.invoiceUrl)
			}else window.open(res.data.invoiceUrl);
		}
		return res.data
	} catch (error) {
		throw new Error(error)
	}
}