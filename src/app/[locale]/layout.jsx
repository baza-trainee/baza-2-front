import "@/src/styles/global.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
// import {  GoogleTagManager } from '@next/third-parties/google'
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
      {/* Додаємо Google Tag Manager лише за наявності NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID */}
      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && 
        <Script id="google-tagmanager" strategy="afterInteractive" >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}')`
          }
        </Script>
      }
      {/*<<<< <!-- Google Tag Manager --> */}
      
      <body>
        {/* Якщо GOOGLE_TAG_MANAGER_ID - null - скрипт не додаємо
         <!-- Google Tag Manager (noscript) --> >>>> */}
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID &&
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}
              height="0" 
              width="0" 
              style={{
                display: 'none',
                visibility: 'hidden',
              }}>
            </iframe>
          </noscript>
        }
        {/*<<<< <!-- Google Tag Manager (noscript) --> */}

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