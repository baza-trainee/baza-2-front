"use client";

import { useTranslations } from "next-intl";
import { ArticleCard } from "../shared/ArticleCard/ArticleCard";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import Carousel from "../shared/Carousel/Carousel";
import { Navigation, Pagination } from "swiper/modules";
import clsx from "clsx";
import { items } from "./items";
import { createKey } from "@/src/lib/utils/createKey";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import styles from "./ArticlesSection.module.scss";

 const ArticlesSection = () => {
  const t = useTranslations("Main.press_about_section");

  return (
    <section className={styles.articleSection}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
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
          className={styles.slider}
          paginationEl={".custom-pagination-article"}
          prevEl={".prevElArticle"}
          nextEl={".nextElArticle"}
          spaceBetween={15}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            930: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            680: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1.5,
            },
            320: {
              slidesPerView: 1.1,
            },
          }}
          items={items}
          renderItem={(item) => <ArticleCard key={createKey()} {...item} />}
        />
        <CarouselPagination
          className={clsx("custom-pagination-article", styles.pagination)}
        />
      </div>
    </section>
  );
};

export default ArticlesSection;