const urlBase = 'https://baza-trainee-landing.vercel.app/api/v1';

const usePaymentHandler = (paymentAmount,locale) => {
  const paymentData = {
    transactionType: 'CREATE_INVOICE',
    merchantDomainName: window.location.hostname,
    apiVersion: 1,
    orderReference: Date.now().toString(),
    orderDate: Date.now(),
    amount: Number(paymentAmount),
    language: locale === "ua" ? "uk" : locale,// мова сторінки оплати
    currency: 'UAH',
    productName: ['Baza trainee support'],
    productCount: [1],
    productPrice: [Number(paymentAmount)],
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
        console.log(checkoutUrl.invoiceUrl)
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
  //handlePayment()
  return paymentData
};

export default usePaymentHandler;