"use client";
import styles from "./ArticlesSection.module.scss";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/src/api/articles";
import { createKey } from "@/src/lib/utils/createKey";
import { ArticleCard } from "../../shared/ArticleCard/ArticleCard";
import CarouselButton from "../../shared/Carousel/CarouselButton/CarouselButton";
import Carousel from "../../shared/Carousel/Carousel";
import { Navigation, Pagination } from "swiper/modules";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import MessageErrorLoading from "../../shared/MessageErrorLoading/MessageErrorLoading";

const ArticlesSection = () => {
  const t = useTranslations("Main.press_about_section");

  // Запит на базу 
  const { isError, data} = useQuery({ 
    queryKey: ['articles'], 
    queryFn:()=>{
      return getAllArticles({ limit: 10})
    }
  });

  return (
    <section className={styles.articlesContainer}>
      <div className={styles.wrapperAll}>
        <h2 className={styles.title}>{t("title")}</h2>

        {!isError && data && 
          <div className={styles.navigationButtons}>
            <CarouselButton
              className={clsx("prevElArticle", styles.prevElArticle)}
            />
            <CarouselButton
              className={clsx("nextElArticle", styles.nextElArticle)}
            />
          </div>
        }
      </div>

      {!isError && data && <>
        <Carousel
          slideClassName={clsx("swiper-slide", styles.mySwiperItem)}
          modules={[Navigation, Pagination]}
          paginationEl={".custom-pagination-article"}
          prevEl={".prevElArticle"}
          nextEl={".nextElArticle"}
          className={clsx("swiper-wrapper", styles.mySwiperWrapper)}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            768: {
              spaceBetween: 24,
              slidesPerView: 2,
            },
            1366: { slidesPerView: 3 },
            1800: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          items={data?.results}
          renderItem={(item) => <ArticleCard key={createKey()} item={item} />}
        />

        <CarouselPagination
          className={clsx("custom-pagination-article", styles.pagination)}
        /></>
      }

      {isError && <MessageErrorLoading/>}
    </section>
  );
};

export default ArticlesSection;
