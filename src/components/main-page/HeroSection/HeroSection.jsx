"use client";
import styles from "./HeroSection.module.scss";
import clsx from "clsx";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { isMIUI} from 'react-device-detect';
import { useQuery } from "@tanstack/react-query";
import { getAllSliders } from "@/src/api/hero-slider";
import Carousel from "../../shared/Carousel/Carousel";
import CarouselButton from "../../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import HeroCard from "../../shared/HeroCard/HeroCard";
import stateUseAlert from "@/src/state/stateUseAlert";
import { useParams } from "next/navigation";

export default function HeroSection() {
  const open = stateUseAlert(state => state.open);
   // Мова сторінки.
   const { locale } = useParams();
  if(isMIUI){ open('infoMiui',false) }

  const { isError, data } = useQuery({ queryKey: ['slider'], 
    queryFn:()=>{return getAllSliders()}});

  return (
    <section className={styles.section}>
      {data && <>
        <Carousel
          modules={[Navigation, Pagination, Autoplay]}
          paginationEl={".custom-pagination-hero"}
          items={data?.results}
          prevEl={".prevElHero"}
          nextEl={".nextElHero"}
          delay={10000}
          breakpoints={{
            992: {
              sped:100,
            },
          }}
          renderItem={(item) => (
            <HeroCard title={item.title[locale]} desc={item.subtitle[locale]} img={item.imageUrl} />
          )}
        />

        <div className={styles.buttons}>
          <CarouselButton className={clsx("prevElHero", styles.prevEl)} />
          <CarouselButton className="nextElHero" />
        </div>

        <CarouselPagination
          className={clsx("custom-pagination-hero", styles.pagination)}
        /></>
      }
      {isError && <div className={styles.error}>
          <h2>Помилка завантаження контенту.</h2>
          <p>Оновіть сторінку або спробуйте пізніше.</p>
        </div>
      }
    </section>
  );
}
