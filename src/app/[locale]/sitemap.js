export default async function sitemap(){
  let blogs = null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API2_URL}/blog`);
    blogs = await response.json();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  // Генеруємо карту сайту для кожного блогу
  const blogEntries = blogs?.results.map(({ _id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${_id}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        'uk-UA': `${process.env.NEXT_PUBLIC_BASE_URL}/ua/blog/${_id}`,
        en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/blog/${_id}`,
        pl: `${process.env.NEXT_PUBLIC_BASE_URL}/pl/blog/${_id}`,
      },
    },
  })) || [];


  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'uk-UA': `${process.env.NEXT_PUBLIC_BASE_URL}/ua`,
          en: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
          pl: `${process.env.NEXT_PUBLIC_BASE_URL}/pl`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/internship`,
      lastModified: new Date(),
      alternates: {
        languages: {
         'uk-UA': `${process.env.NEXT_PUBLIC_BASE_URL}/ua/internship`,
          en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/internship`,
          pl: `${process.env.NEXT_PUBLIC_BASE_URL}/pl/internship`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'uk-UA': `${process.env.NEXT_PUBLIC_BASE_URL}/ua/projects`,
          en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/projects`,
          pl: `${process.env.NEXT_PUBLIC_BASE_URL}/pl/projects`,
        },
      },
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          'uk-UA': `${process.env.NEXT_PUBLIC_BASE_URL}/ua/blog`,
          en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/blog`,
          pl: `${process.env.NEXT_PUBLIC_BASE_URL}/pl/blog`,
        },
      },
    },
    // Динамічно додаємо маршрути для кожного блогу
    ...blogEntries
  ];
}
