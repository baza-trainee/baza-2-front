"use client";

import { useTranslations } from "next-intl";
import { ArticleCard } from "../shared/ArticleCard/ArticleCard";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import Carousel from "../shared/Carousel/Carousel";
import { Navigation } from "swiper/modules";
import clsx from "clsx";
import { items } from "./items";

import styles from "./ArticlesSection.module.scss";
import { createKey } from "@/src/lib/utils/createKey";

export const ArticlesSection = () => {
  const t = useTranslations("Main.press_about_section");

  return (
    <section className={styles.articlesContainer}>
      <div className={styles.wrapperAll}>
        <h2 className={styles.title}>{t("title")}</h2>
        <div className={styles.navigationButtons}>
          <CarouselButton
            className={clsx("prevElArticle", styles.prevElArticle)}
          />
          <CarouselButton className="nextElArticle" />
        </div>
      </div>

      <Carousel
        slideClassName={clsx("swiper-slide", styles.mySwiperItem)}
        modules={[Navigation]}
        prevEl={".prevElArticle"}
        nextEl={".nextElArticle"}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          1280: {
            slidesPerView: 2,
          },
          1920: {
            spaceBetween: 30,
            slidesPerView: 4,
          },
        }}
        items={items}
        renderItem={(item) => <ArticleCard key={createKey()} item={item} />}
      />
    </section>
  );
};
