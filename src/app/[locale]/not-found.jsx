import { PageNotFound } from "@/src/components/PageNotFound/PageNotFound";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Page_404");
  return (
    <PageNotFound
      textErr={t('title')}
      textErrBtn={t('btn_home')}
    />
  );
}
