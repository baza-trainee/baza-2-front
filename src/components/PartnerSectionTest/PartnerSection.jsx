"use client";

import Carousel from "../shared/Carousel/Carousel";
import PartnerCard from "../shared/PartnerCardTest/PartnerCard";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import { partnerCardItems } from "./partnerCardItems";
import { useTranslations } from "next-intl";
import styles from "./PartnerSection.module.scss";

const PartnerSectionTest = () => {

  const t = useTranslations("Main.partners_section");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Test {t("title")}</h2>
          <div className={styles.navigation}>
            <CarouselButton
              className={clsx("partner-test-prevBtn", styles.prevBtn)}
            />
            <CarouselButton className="partner-test-nextBtn" />
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <Carousel
            delay={3000}
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            paginationEl={".partner-test-custom-pagination"}
            //spaceBetween={10}
            items={partnerCardItems}
            prevEl={".partner-test-prevBtn"}
            nextEl={".partner-test-nextBtn"}
            effect={'coverflow'}
            loop={true}
            //loopAddBlankSlides={true}
            // //loopedSlides={2}
            // loopAdditionalSlides={2}
            // //loopFillGroupWithBlank={true}
            // //slidesPerGroup={1}
            // centeredSlides={true}
            // slidesPerView={3}
  
            // //virtual={true}
            //loopAdditionalSlides={1}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={40}
            loopAdditionalSlides={0}
            pauseOnMouseEnter={true}
            // loopAdditionalSlides={2}
            // centeredSlides={true}
            // slidesPerView={3}
            // spaceBetween={10}
         

            breakpoints={{
              768: {
              spaceBetween: 10,
              slidesPerView: 2,
              loopAdditionalSlides:0,
              spaceBetween:10
              //centeredSlides:true
            },
            // 768: {
            //   spaceBetween: 10,
            //   slidesPerView: 2,
            // },
            1366: {
              // slidesPerView: 4,
              // spaceBetween: 10,
              //spaceBetween: 10,
              slidesPerView: 3,
              loopAdditionalSlides:2,
              spaceBetween:10
            },
            // 1920: {
            //   slidesPerView: 3,
            //   spaceBetween: 10,
            // },
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
          className={clsx("partner-test-custom-pagination", styles.pagination)}
        />
      </div>
    </section>
  );
};

export default PartnerSectionTest;
