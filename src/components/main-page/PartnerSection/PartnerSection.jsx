"use client";
import styles from "./PartnerSection.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { isFirefox } from 'react-device-detect';
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getAllPartners } from "@/src/api/partners";
import Carousel from "../../shared/Carousel/Carousel";

import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import CarouselButton from "../../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import PartnerCard from "../../shared/PartnerCard/PartnerCard";
import { createKey } from "@/src/lib/utils/createKey";
import MessageErrorLoading from "../../shared/MessageErrorLoading/MessageErrorLoading";

const PartnerSection = () => {
  const[ screenOrien, setScreenOrien ] = useState('')
  const t = useTranslations("Main.partners_section");

  const { isError, data } = useQuery({ queryKey: ['partners', screenOrien], queryFn: getAllPartners });

  const isMobileFirefox = isFirefox && /Android/i.test(navigator.userAgent);

  useEffect(()=>{
    const refetch=()=>{
      setScreenOrien( window?.screen.orientation.type )
    }
    window?.screen.orientation.addEventListener("change", refetch);

    return ()=>{ window?.screen.orientation.removeEventListener("change", refetch)}
  },[])

  // Повертає 10 випадкових елементів, якщо єлементів менше 4 - клонує елементи
  function shuffle(arr) {
    const array = arr.length > 4 ? [...arr]: [...arr,...arr]
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.length > 10 ? array.slice(0, 10) : array
  }

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{t("title")}</h2>

          {data && data.results.length && <div className={styles.navigation}>
            <CarouselButton
              className={clsx("partner-prevBtn", styles.prevBtn)}
            />
            <CarouselButton className="partner-nextBtn" />
          </div>}

        </div>
        <div className={styles.sliderBox}>

        {data && data.results.length ? <Carousel
            delay={3000}
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            paginationEl={".partner-custom-pagination"}
            items={shuffle(data?.results)}
            prevEl={".partner-prevBtn"}
            nextEl={".partner-nextBtn"}
            effect={'coverflow'}
            loop={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={40}
            loopAdditionalSlides={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 5
              },
              1200: {
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
              <PartnerCard key={createKey()} item={item} />
            )}
          />: null}

          {isError && <MessageErrorLoading/>}
        </div>
      
        {data && data.results.length && <CarouselPagination
          className={clsx("partner-custom-pagination", styles.pagination)}
        />}

      </div>
    </section>
  );
};

export default PartnerSection;
