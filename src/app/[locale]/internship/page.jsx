import { useTranslations } from "next-intl";

export default function Internship () {
  // Видалити після тестів
  const t = useTranslations('Index');
  return <main>
      {/* Видалити після тестів */}
    <h1>Internship page {t('title')}</h1>
  </main>
}