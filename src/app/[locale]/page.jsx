import style from "./page.module.scss";
import { useTranslations } from "next-intl";

import LangDropdown from "@/src/components/LangDropdown/LangDropdown";
import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";
import ExampleButtons from "@/src/components/ExampleButtons/ExampleButtons";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FeedbackCard from "@/src/components/shared/FeedbackCard/FeedbackCard";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <main>
      <LangDropdown />
      <ExampleButtons />
      <h1>{t("title")}</h1>
      <ScrollToTopBtn />
      <FeedbackCard />
      <CarouselTestSection />
      <RoleCardTestSection />
    </main>
  );
}
