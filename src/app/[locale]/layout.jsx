import CookiesModal from "@/src/components/modals/CookiesModal/CookiesModal";
import PaymentModal from "@/src/components/modals/PaymentModal/PaymentModal";
import Footer from "@/src/components/shared/Footer/Footer";
import Header from "@/src/components/shared/Header/Header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import "@/src/styles/global.scss";
import ErrorAlert from "@/src/components/shared/ErrorAlert/ErrorAlert";

export const metadata = {
  title: "Baza trainee 2",
  description: "Baza trainee web site",
  icons: {
    icon: ["/favicons/favicon.svg"]
  },
};

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  return (
    <html lang={locale === "ua" ? "uk" : locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="wrapper">
            <Header />
            {children}
            <Footer />
            <PaymentModal />
            <CookiesModal />
          </div>
        </NextIntlClientProvider>
        <NextTopLoader
          color="#ff62ce"
          height={2}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #ff62ce,0 0 5px #ff62ce"
        />
      </body>
    </html>
  );
}
