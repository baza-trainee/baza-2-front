"use client";
import styles from "./HeroSection.module.scss";
import clsx from "clsx";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroCardItems } from "./heroCardItems";
import Carousel from "../../shared/Carousel/Carousel";
import CarouselButton from "../../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import HeroCard from "../../shared/HeroCard/HeroCard";
import stateUseAlert from "@/src/state/stateUseAlert";
import { isMIUI} from 'react-device-detect';

export default function HeroSection() {
  const open = stateUseAlert(state => state.open);
  if(isMIUI){ open('infoMiui',false) }

  return (
    <section className={styles.section}>
      <Carousel
        modules={[Navigation, Pagination, Autoplay]}
        paginationEl={".custom-pagination-hero"}
        items={heroCardItems}
        prevEl={".prevElHero"}
        nextEl={".nextElHero"}
        delay={10000}
        breakpoints={{
          992: {
            sped:100,
          },
        }}
        renderItem={(item) => (
          <HeroCard title={item.title} desc={item.desc} img={item.img} />
        )}
      />

      <div className={styles.buttons}>
        <CarouselButton className={clsx("prevElHero", styles.prevEl)} />
        <CarouselButton className="nextElHero" />
      </div>

      <CarouselPagination
        className={clsx("custom-pagination-hero", styles.pagination)}
      />
    </section>
  );
}
