// !! Логіка запиту на старий бекенд на отримання посилання сторінки оплати. !!
const urlBase = 'https://baza-trainee-landing.vercel.app/api/v1';

const usePaymentHandler = (payment, locale) => {
	const paymentAmount = payment === "0" ? '1' : payment;

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
	};

	const handlePayment = async () => {
		if (Number(paymentAmount)) {
			try {
				const response = await fetch(`${urlBase}/payment`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(paymentData)
				});

				const checkoutUrl = await response.json();
				if (checkoutUrl.invoiceUrl) {
					window.location.href = checkoutUrl.invoiceUrl;
				}
			} catch (error) {
				setErrorMessage('Error occurred while processing payment');
				console.error(error);
			}
		} else {
			setErrorMessage('Please enter a valid payment amount');
		}
	};
	// Розкоментувати щоб побачити перехід на сторінку оплати.
	// !!! Обержно платежі справжні !!!
	//handlePayment()
	return paymentData
};

export default usePaymentHandler;