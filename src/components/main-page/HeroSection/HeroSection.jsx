"use client";
import styles from "./HeroSection.module.scss";
import clsx from "clsx";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { isMIUI} from 'react-device-detect';
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { localeUkToUa } from "@/src/lib/utils/localeUkToUa";
import { useQuery } from "@tanstack/react-query";
import { getAllSliders } from "@/src/api/hero-slider";
import Carousel from "../../shared/Carousel/Carousel";
import CarouselButton from "../../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import HeroCard from "../../shared/HeroCard/HeroCard";
import stateUseAlert from "@/src/state/stateUseAlert";

export default function HeroSection() {
  const t = useTranslations("Main.hero_section");
  const open = stateUseAlert(state => state.open);
   // Мова сторінки.
   const { locale } = useParams();
  if(isMIUI){ open('infoMiui',false) }

  const { isLoading, isError, data } = useQuery({ queryKey: ['slider'], 
    queryFn:()=>{return getAllSliders()}});

  return (
    <section className={styles.section}>
      { !isLoading && !isError && data ? 
        <>
          <Carousel
            modules={[Navigation, Pagination, Autoplay]}
            paginationEl={".custom-pagination-hero"}
            items={data?.results}
            prevEl={".prevElHero"}
            nextEl={".nextElHero"}
            delay={15000}
            breakpoints={{
              992: {
                sped:100,
              },
            }}
            renderItem={(item) => (
              <HeroCard 
                title={item.title[localeUkToUa(locale)]} 
                desc={item.subtitle[localeUkToUa(locale)]} 
                img={item.imageUrl} 
              />
            )}
          />

          <div className={styles.buttons}>
            <CarouselButton className={clsx("prevElHero", styles.prevEl)} />
            <CarouselButton className="nextElHero" />
          </div>

          <div className={styles.wrapper_pagination}>
            <CarouselPagination
              className={clsx("custom-pagination-hero", styles.pagination)}
            />
          </div>
        </> : 
        <HeroCard 
          title={t("title")} 
          desc={t("text")} 
          img={'/images/placeholder-image/slide_1.jpg'} 
          variant={'error'}
        />
      }
    </section>
  );
}