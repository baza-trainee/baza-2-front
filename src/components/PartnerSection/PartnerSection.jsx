"use client";

import Carousel from "../shared/Carousel/Carousel";
import PartnerCard from "../shared/PartnerCard/PartnerCard";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import { isFirefox } from 'react-device-detect';
import { useTranslations } from "next-intl";
import styles from "./PartnerSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllPartners } from "@/src/api/partners";

const PartnerSection = () => {
  const { isLoading, isError, data } = useQuery({ queryKey: ['partners'], queryFn: getAllPartners });
  const t = useTranslations("Main.partners_section");
  const isMobileFirefox = isFirefox && /Android/i.test(navigator.userAgent);

  if (isError) { return <h1>Нажаль немає контенту</h1>; }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.navigation}>
            <CarouselButton
              className={clsx("partner-prevBtn", styles.prevBtn)}
            />
            <CarouselButton className="partner-nextBtn" />
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <Carousel
            delay={3000}
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            paginationEl={".partner-custom-pagination"}
            items={data?.results}
            prevEl={".partner-prevBtn"}
            nextEl={".partner-nextBtn"}
            effect={'coverflow'}
            loop={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={40}
            loopAdditionalSlides={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 5
              },
              1366: {
                slidesPerView: 3,
                spaceBetween: 10
              }
            }}
            coverflowEffect={isMobileFirefox ? {
              rotate: 2,
              stretch: 0,
              depth: 20,
              modifier: 1,
              slideShadows: false,
            } : {
              rotate: 10,
              stretch: 10,
              depth: 350,
              modifier: 1,
              slideShadows: false,
            }}
            renderItem={(item) => (
              <PartnerCard key={item.id} item={item} />
            )}
          />
        </div>
        <CarouselPagination
          className={clsx("partner-custom-pagination", styles.pagination)}
        />
      </div>
    </section>
  );
};

export default PartnerSection;
