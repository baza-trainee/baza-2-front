import Footer from "@/src/components/Footer/Footer";
//import NavLinks from "@/src/components/NavLinks/NavLinks";
import TestExampleLangDropdown from "@/src/components/TestExampleLangDropdown/TestExampleLangDropdown";
import "@/src/styles/global.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
  title: "Baza trainee 2",
  description: "Baza trainee web site",
  icons: {
    icon: ['/favicons/favicon.svg'],
    // apple: ['/apple-touch-icon.png'],
    // shortcut: ['/apple-touch-icon.png'],
  },
};

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  return (
    <html lang={locale === "ua" ? "uk" : locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="wrapper">
            {/* <NavLinks /> */}
            <TestExampleLangDropdown />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
