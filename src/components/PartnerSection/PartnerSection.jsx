"use client";

import Carousel from "../shared/Carousel/Carousel";
import PartnerCard from "../shared/PartnerCard/PartnerCard";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import styles from "./PartnerSection.module.scss";

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
            delay={3000}
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            paginationEl={".partner-custom-pagination"}
            items={partnerCardItems}
            prevEl={".partner-prevBtn"}
            nextEl={".partner-nextBtn"}
            effect={'coverflow'}
            loop={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={40}
            loopAdditionalSlides={0}
            breakpoints={{
              768: {
              slidesPerView: 2,
              loopAdditionalSlides:0,
              spaceBetween:10
            },
            1366: {
              slidesPerView: 3,
              loopAdditionalSlides:2,
              spaceBetween:10
            }
          }}
            coverflowEffect={
              {
                rotate: 1,
                stretch: 10,
                depth: 350,
                modifier: 1,
                slideShadows: false,
              }
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