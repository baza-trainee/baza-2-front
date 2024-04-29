import { useTranslations } from "next-intl";

export default function Internship () {
  // Видалити після тестів
  const t = useTranslations('Main.hero_сarousel.slide_1');
  return <main>
    Тут буде контент сторінки - Стажування
      {/* Видалити після тестів */}
    <h1>Internship page {t('title')}</h1>
    <p>{t('text')}</p>
  </main>
}