import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Можна імпортувати зі спільної конфігурації
export const locales = ["ua", "en", "pl"];

export default getRequestConfig(async ({ locale }) => {
  //Переконайтеся, що вхідний параметр `locale` дійсний
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});


export const pathnames = {
  "/": "/",
};
