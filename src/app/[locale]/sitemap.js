import { getLocale } from "next-intl/server";

// const baseUrl = process.env.VERCEL_URL ? 
//   `https://${process.env.VERCEL_URL}` : 
//   process.env.NEXT_PUBLIC_BASE_URL;



export default async function sitemap(req){
  const host = req?.headers?.host; // Отримання хоста з заголовка

  const baseApiUrl = process.env.NEXT_PUBLIC_API2_URL ? 
    process.env.NEXT_PUBLIC_API2_URL : 
  '';  
 
  const baseUrl = host ? 
    `https://${host}` : 
    process.env.NEXT_PUBLIC_BASE_URL;

  const locale = await getLocale();
  
  let blogs = null;

  try {
    const response = await fetch(`${baseApiUrl}/blog`);
    blogs = await response.json();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  // Генеруємо карту сайту для кожного блогу
  const blogEntries = blogs?.results.map(({ _id }) => ({
    url: `${baseUrl}/${locale}/blog/${_id}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        'uk-UA': `${baseUrl}/ua/blog/${_id}`,
        en: `${baseUrl}/en/blog/${_id}`,
        pl: `${baseUrl}/pl/blog/${_id}`,
      },
    },
  })) || [];


  return [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'uk-UA': `${baseUrl}/ua`,
          en: `${baseUrl}/en`,
          pl: `${baseUrl}/pl`,
        },
      },
    },
    {
      url: `${baseUrl}/${locale}/internship`,
      lastModified: new Date(),
      alternates: {
        languages: {
         'uk-UA': `${baseUrl}/ua/internship`,
          en: `${baseUrl}/en/internship`,
          pl: `${baseUrl}/pl/internship`,
        },
      },
    },
    {
      url: `${baseUrl}/${locale}/projects`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'uk-UA': `${baseUrl}/ua/projects`,
          en: `${baseUrl}/en/projects`,
          pl: `${baseUrl}/pl/projects`,
        },
      },
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'uk-UA': `${baseUrl}/ua/blog`,
          en: `${baseUrl}/en/blog`,
          pl: `${baseUrl}/pl/blog`,
        },
      },
    },
    // Динамічно додаємо маршрути для кожного блогу
    ...blogEntries
  ];
}
