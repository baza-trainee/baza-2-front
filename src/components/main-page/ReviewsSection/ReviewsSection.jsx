"use client";

import Carousel from "../../shared/Carousel/Carousel";
import FeedbackCard from "../../shared/FeedbackCard/FeedbackCard";
import { Navigation, Pagination } from "swiper/modules";
import CarouselButton from "../../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import styles from "./ReviewsSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/src/api/reviews";
import { useParams } from "next/navigation";

const ReviewsSection = () => {
  const t = useTranslations("Main.reviews_section");
  // Мова сторінки.
  const { locale } = useParams();
  // Запит на базу
  const { isError, data } = useQuery({ queryKey: ['reviews'], 
    queryFn:getAllReviews});

  // Повертає 10 елементів, якщо їх більше та сортує по даті,
  function sortData(arr) {
    const array = arr.sort(function (a, b) {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
    return array.length > 10 ? array.slice(0, 10) : array
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{t("title")}</h2>

        {data?.length && <div className={styles.navigation}>
            <CarouselButton
              className={clsx("feedback-prevBtn", styles.prevBtn)}
            />
            <CarouselButton className="feedback-nextBtn" />
          </div>
        }

        </div>
        <div className={styles.sliderContainer}>

          { data?.length && <Carousel
            modules={[Navigation, Pagination]}
            paginationEl={".feedback-custom-pagination"}
            items={sortData(data)}
            prevEl={".feedback-prevBtn"}
            nextEl={".feedback-nextBtn"}
            renderItem={(item) => <FeedbackCard {...item} locale={locale}/>}
          />
          }
          {isError && <p>Помилка завантаження</p>}

        </div>
       {data?.length && <CarouselPagination
          className={clsx("feedback-custom-pagination", styles.pagination)}
        />}
      </div>
    </section>
  );
};

export default ReviewsSection;
