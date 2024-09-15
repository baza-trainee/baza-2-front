export default function robots(req){
  const host = req?.headers?.host; // Отримання хоста з заголовка

  const baseUrl = host ? 
    `https://${host}` : 
    process.env.NEXT_PUBLIC_BASE_URL;  

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/public', '/login'],
      },
    ],
    sitemap: [
      `${baseUrl}/uk/sitemap.xml`,
      `${baseUrl}/en/sitemap.xml`,
      `${baseUrl}/pl/sitemap.xml`,
    ],
  };
}
