import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

export default createMiddleware({
  //Список усіх підтримуваних локалізацій
  locales: locales,

  // Використовується, коли не збігається жодна локаль
  defaultLocale: "ua",
  localeDetection: false
});

export const config = {
  // Зіставляти лише інтернаціоналізовані шляхи
  matcher: ["/", "/(ua|en|pl)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
