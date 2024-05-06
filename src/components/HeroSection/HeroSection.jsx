"use client";
import styles from './HeroSection.module.scss'
import clsx from "clsx";
import { Navigation, Pagination } from "swiper/modules";
import Carousel from '../shared/Carousel/Carousel';
import CarouselButton from '../shared/Carousel/CarouselButton/CarouselButton';
import CarouselPagination from '../shared/Carousel/CarouselPagination/CarouselPagination';

export default function HeroSection(){
  const items = [
    { content: "slide 1" },
    { content: "slide 2" },
    { content: "slide 3" },
    { content: "slide 4" },
    { content: "slide 5" }
  ];

  return(
    <section className={styles.section}>

        <Carousel
          modules={[Navigation, Pagination]}
          paginationEl={".custom-pagination1"}
          items={items}
          prevEl={".prevEl"}
          nextEl={".nextEl"}
          renderItem={(item) => <div className={styles.item}>{item.content}</div>}
        />
        <div className={styles.navigation}>
          <div className={styles.buttons}>
            <CarouselButton className={clsx("prevEl", styles.prevEl)} />
            <CarouselButton className="nextEl" />
          </div>
          <CarouselPagination className={clsx("custom-pagination1", styles.pagination)}/>
        </div>

       
    </section>
  )
}