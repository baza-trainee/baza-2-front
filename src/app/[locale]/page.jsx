import ExampleButtons from "@/src/components/MainButton/ExampleButtons/ExampleButtons";
import style from "./page.module.scss";
import { useTranslations } from "next-intl";
import LangDropdown from "@/src/components/LangDropdown/LangDropdown";
import { ScrollToTopBtn } from "@/src/components/ScrollToTopBtn/ScrollToTopBtn";
import FeedbackCard from "@/src/components/FeedbackCard/FeedbackCard";
import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <main>
      <LangDropdown />
      <ExampleButtons />
      <h1>{t("title")}</h1>;
      <ScrollToTopBtn />
      <FeedbackCard />
      <CarouselTestSection />
      <RoleCardTestSection />
    </main>
  );
}
