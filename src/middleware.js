import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ua','en', 'pl'],
 
  // Used when no locale matches
  //lng: 'ua',
  defaultLocale: 'ua',
  //debugger: true,
  //localeDetection: false
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/',
   '/(ua|en|pl)/:path*', 
   '/((?!_next|_vercel|.*\\..*).*)'
  ]
};