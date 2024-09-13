export default function robots(){
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/public', '/login'],
      },
    ],
    sitemap: [
      `${baseUrl}/ua/sitemap.xml`,
      `${baseUrl}/en/sitemap.xml`,
      `${baseUrl}/pl/sitemap.xml`,
    ],
  };
}
