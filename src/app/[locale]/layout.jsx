import "@/src/styles/global.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/src/components/providers/queryProvider";
import LayoutProvider from "@/src/components/providers/LayoutProvider";

// Динамічне налаштування метаданих через Metadata API
export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: "Baza Trainee Ukraine: internships for trainee and junior",
    description: "Baza Trainee Ukraine - we will make sure you get an internship. Get a unique experience of teamwork",
    icons: {
      icon: ["/favicons/favicon.svg"],
    },
    alternates: {
      languages: {
        'uk-UA': `${baseUrl}/ua`,
        'en': `${baseUrl}/en`,
        'pl': `${baseUrl}/pl`,
      }
    }
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale === "ua" ? "uk-UA" : locale}>
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



// import "@/src/styles/global.scss";
// import { NextIntlClientProvider } from "next-intl";
// import Head from "next/head";
// import { getMessages } from "next-intl/server";
// import NextTopLoader from "nextjs-toploader";
// import QueryProvider from "@/src/components/providers/queryProvider";
// import LayoutProvider from "@/src/components/providers/LayoutProvider";

// // metadata default
// export const metadata = {
//   title: "Baza Trainee Ukraine: internships for trainee and junior",
//   description: "Baza Trainee Ukraine - we will make sure you get an internship. Get a unique experience of teamwork",
//   icons: {
//     icon: ["/favicons/favicon.svg"],
//   },
// };

// export default async function LocaleLayout({ children, params: { locale } }) {
//   const messages = await getMessages();

//   // Отримуємо базовий URL зі змінної середовища
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//   // Масив для hreflang атрибутів з використанням базового URL
//   const hreflangs = [
//     { lang: 'uk', url: `${baseUrl}/ua` },
//     { lang: 'en', url: `${baseUrl}/en` },
//     { lang: 'pl', url: `${baseUrl}/pl` },
//   ];

//   return (
//     <html lang={locale === "ua" ? "uk-UA" : locale}>
//       <Head>
//         {/* Додаємо hreflang для кожної мови */}
//         {hreflangs.map((hreflang) => (
//           <link key={hreflang.lang} 
//             rel="alternate" 
//             href={hreflang.url} 
//             hrefLang={hreflang.lang} />
//         ))}
//       </Head>

//       <body>
//         <QueryProvider>
//           <NextIntlClientProvider locale={locale} messages={messages}>
//             <LayoutProvider>
//               {children}
//             </LayoutProvider>
//           </NextIntlClientProvider>
//           <NextTopLoader
//             color="#ff62ce"
//             height={2}
//             showSpinner={false}
//             easing="ease"
//             speed={200}
//             shadow="0 0 10px #ff62ce,0 0 5px #ff62ce"
//           />
//         </QueryProvider>
//       </body>
//     </html>
//   );
// }


// import "@/src/styles/global.scss";
// import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
// import NextTopLoader from "nextjs-toploader";
// import QueryProvider from "@/src/components/providers/queryProvider";
// import LayoutProvider from "@/src/components/providers/LayoutProvider";

// // metadata default
// export const metadata = {
//   title: "Baza Trainee Ukraine: internships for trainee and junior",
//   description: "Baza Trainee Ukraine - we will make sure you get an internship. Get a unique experience of teamwork",
//   icons: {
//     icon: ["/favicons/favicon.svg"],
//   },
// };

// export default async function LocaleLayout({ children, params: { locale } }) {
//   const messages = await getMessages();
//   return (
//     <html lang={locale === "ua" ? "uk-UA" : locale}>
//       <body>
//         <QueryProvider>
//           <NextIntlClientProvider locale={locale} messages={messages}>
//             <LayoutProvider>
//               {children}
//             </LayoutProvider>
//           </NextIntlClientProvider>
//           <NextTopLoader
//             color="#ff62ce"
//             height={2}
//             showSpinner={false}
//             easing="ease"
//             speed={200}
//             shadow="0 0 10px #ff62ce,0 0 5px #ff62ce"
//           />
//         </QueryProvider>
//         </body>
//     </html>
//   );
// }
