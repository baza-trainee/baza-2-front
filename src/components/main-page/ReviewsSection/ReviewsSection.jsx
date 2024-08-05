"use client";

import Carousel from "../../shared/Carousel/Carousel";
import FeedbackCard from "../../shared/FeedbackCard/FeedbackCard";
import { Navigation, Pagination } from "swiper/modules";
import CarouselButton from "../../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
//import { items } from "./data";
import { useTranslations } from "next-intl";
import styles from "./ReviewsSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/src/api/reviews";

const ReviewsSection = () => {
  const t = useTranslations("Main.reviews_section");
  // Запит на базу 1
  const { isError, data } = useQuery({ queryKey: ['reviews'], 
    queryFn:getAllReviews});


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
            items={data}
            prevEl={".feedback-prevBtn"}
            nextEl={".feedback-nextBtn"}
            renderItem={(item) => <FeedbackCard {...item} />}
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
