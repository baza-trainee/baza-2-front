"use client";

import Carousel from "../shared/Carousel/Carousel";
import PartnerCard from "../shared/PartnerCard/PartnerCard";
import { Navigation, Pagination } from "swiper/modules";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import { partnerCardItems } from "./partnerCardItems";
import { useTranslations } from "next-intl";
import styles from "./PartnerSection.module.scss";

const PartnerSection = () => {

  const getSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 320) return 1;
      return 3;
    }
  };
  const t = useTranslations("Main.partners_section");
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
            modules={[Navigation, Pagination]}
            paginationEl={".partner-custom-pagination"}
            slidesPerView={getSlidesPerView()}
            spaceBetween={10}
            items={partnerCardItems}
            prevEl={".partner-prevBtn"}
            nextEl={".partner-nextBtn"}
            useCoverflow={true}
            useAutoplay={true}
            renderItem={(item) => (
              <PartnerCard item={item} />
            )} />
        </div>
        <CarouselPagination
          className={clsx("partner-custom-pagination", styles.pagination)}
        />
      </div>
    </section>
  );
};

export default PartnerSection;
