"use client";

import { useState } from "react";
import Carousel from "../shared/Carousel/Carousel";
import PartnerCard from "../shared/PartnerCard/PartnerCard";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import { partnerCardItems } from "./partnerCardItems";
import { useTranslations } from "next-intl";
import styles from "./PartnerSection.module.scss";

const PartnerSection = () => {

  const [useCoverflow, setUseCoverflow] = useState(false); 


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
            modules={[Navigation, Pagination, EffectCoverflow]}
            paginationEl={".partner-custom-pagination"}
            slidesPerView={3}
            spaceBetween={10}
            items={partnerCardItems}
            prevEl={".partner-prevBtn"}
            nextEl={".partner-nextBtn"}
            grabCursor={useCoverflow}
            centeredSlides={useCoverflow}
            loop={true}
            coverflowEffect={
              useCoverflow
                ? {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }
                : {}
            }
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
