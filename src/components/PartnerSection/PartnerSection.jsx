"use client";

import Carousel from "../shared/Carousel/Carousel";
import PartnerCard from "../shared/PartnerCard/PartnerCard";
import { Navigation, Pagination } from "swiper/modules";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import styles from "./PartnerSection.module.scss";
import { partnerCardItems } from "./partnerCardItems";
import { useTranslations } from "next-intl";

const PartnerSection = () => {
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
            modules={[Navigation, Pagination]}
            paginationEl={".partner-custom-pagination"}
            slidesPerView={3}
            items={partnerCardItems}
            prevEl={".partner-prevBtn"}
            nextEl={".partner-nextBtn"}
            renderItem={(item) => <PartnerCard {...item} />}
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
