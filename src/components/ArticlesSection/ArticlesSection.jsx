"use client";

import { useTranslations } from "next-intl";
import styles from "./ArticlesSection.module.scss";
import { ArticleCard } from "../shared/ArticleCard/ArticleCard";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import Carousel from "../shared/Carousel/Carousel";
import { Navigation } from "swiper/modules";
import clsx from "clsx";
import { items } from "./items";

export const ArticlesSection = () => {
  const t = useTranslations("Main.press_about_section");

  return (
    <section className="articles-container">
      <div className={styles.wrapperAll}>
        <h2 className={styles.title}>{t("title")}</h2>
        <div className={styles.navigation}>
          <CarouselButton className={clsx("prevEl", styles.prevEl)} />
          <CarouselButton className="nextEl" />
        </div>
        <Carousel
          modules={[Navigation]}
          paginationEl={".custom-pagination"}
          prevEl={".prevEl"}
          nextEl={".nextEl"}
          className={styles.wrapper}
          slidesPerView={3}
          items={items}
          renderItem={(item) => <ArticleCard key={Date.now()} item={item} />}
        />
      </div>
    </section>
  );
};
