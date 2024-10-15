import "@/src/styles/global.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
import {  GoogleTagManager } from '@next/third-parties/google'
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
      {/*  Якщо GOOGLE_TAG_MANAGER_ID - null - Script не додаємо 
        <!-- Google Tag Manager --> >>>>*/
      }
      { process.env.GOOGLE_TAG_MANAGER_ID &&
        <> 
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
          ></Script>

          <Script id="google-analytics">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', ${process.env.GOOGLE_TAG_MANAGER_ID});`}
          </Script>

          <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID}/>
        </>
      }
      {/*<<<< <!-- Google Tag Manager --> */}
      
      <body>
        {/* Якщо GOOGLE_TAG_MANAGER_ID - null - скрипт не додаємо
         <!-- Google Tag Manager (noscript) --> >>>> */}
        {process.env.GOOGLE_TAG_MANAGER_ID &&
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
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