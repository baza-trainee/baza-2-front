"use client";

import { useTranslations } from "next-intl";
import { ArticleCard } from "../shared/ArticleCard/ArticleCard";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import Carousel from "../shared/Carousel/Carousel";
import { Navigation, Pagination } from "swiper/modules";
import clsx from "clsx";
import { items } from "./items";

import styles from "./ArticlesSection.module.scss";
import { createKey } from "@/src/lib/utils/createKey";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";

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
        modules={[Navigation, Pagination]}
        paginationEl={".custom-pagination-article"}
        prevEl={".prevElArticle"}
        nextEl={".nextElArticle"}
        speed={1000}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          1280: {
            slidesPerView: 2,
            pagination: {
              clickable: false,
            },
          },
          // 1440: {
          //   spaceBetween: 30,
          // },
          1920: {
            spaceBetween: 30,
            slidesPerView: 3,
          },
        }}
        items={items}
        renderItem={(item) => <ArticleCard key={createKey()} item={item} />}
      />
      <CarouselPagination
        className={clsx("custom-pagination-article", styles.paginationArticle)}
      />
    </section>
  );
};
