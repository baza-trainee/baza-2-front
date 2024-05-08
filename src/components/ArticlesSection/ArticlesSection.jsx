"use client";

import { useTranslations } from "next-intl";
import { ArticleCard } from "../shared/ArticleCard/ArticleCard";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import Carousel from "../shared/Carousel/Carousel";
import { Navigation } from "swiper/modules";
import clsx from "clsx";
import { items } from "./items";

import styles from "./ArticlesSection.module.scss";

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
        className={clsx("swiper", styles.mySwiper)}
        slideClassName={(clsx("swiper-slide"), styles.mySwiperItem)}
        modules={[Navigation]}
        prevEl={".prevElArticle"}
        nextEl={".nextElArticle"}
        slidesPerView={1}
        breakpoints={{
          1280: {
            slidesPerView: 3,
          },
          1920: {
            slidesPerView: 4,
          },
        }}
        items={items}
        renderItem={(item) => <ArticleCard key={Date.now()} item={item} />}
      />
    </section>
  );
};
