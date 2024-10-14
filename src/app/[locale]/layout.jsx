import "@/src/styles/global.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/src/components/providers/queryProvider";
import LayoutProvider from "@/src/components/providers/LayoutProvider";

// Динамічне налаштування метаданих через Metadata API
export async function generateMetadata() {
  return {
    title: "Baza Trainee Ukraine-internships for trainee and junior",
    description: "Baza Trainee Ukraine - we will make sure you get an internship. Get a unique experience of teamwork",
    icons: {
      icon: ["/favicons/favicon.svg"],
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>

      <body>
      
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </NextIntlClientProvider>
          <NextTopLoader
            color="#ff62ce"
            height={2}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #ff62ce,0 0 5px #ff62ce"
          />
        </QueryProvider>
      </body>
    </html>
  );
}