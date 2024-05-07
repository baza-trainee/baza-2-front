"use client";
import styles from './HeroSection.module.scss'
import clsx from "clsx";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Carousel from '../shared/Carousel/Carousel';
import CarouselButton from '../shared/Carousel/CarouselButton/CarouselButton';
import CarouselPagination from '../shared/Carousel/CarouselPagination/CarouselPagination';
import { HeroCard } from '../shared/HeroCard/HeroCard';

export default function HeroSection(){
  const items = [
    { 
      title: "slide_1.title", 
      desc:'slide_1.text',
      img:'/images/hero_section/hero.png'
    },
    { 
      title: "slide_2.title", 
      desc:'slide_2.text',
      img:'/images/hero_section/hero.png'
    },
    { 
      title: "slide_3.title", 
      desc:'slide_3.text',
      img:'/images/hero_section/hero.png'
    },
    { 
      title: "slide_4.title", 
      desc:'slide_4.text',
      img:'/images/hero_section/hero.png'
    },
    { 
      title: "slide_5.title", 
      desc:'slide_5.text',
      img:'/images/hero_section/hero.png'
    },
  ];

  return(
    <section className={styles.section}>
      <Carousel
        modules={[Navigation, Pagination, Autoplay]}
        paginationEl={".custom-pagination-hero"}
        items={items}
        prevEl={".prevElHero"}
        nextEl={".nextElHero"}
        renderItem={(item) => <HeroCard title={item.title} desc={item.desc} img={item.img}/>}
      />

      <div className={styles.buttons}>
        <CarouselButton className={clsx("prevElHero", styles.prevEl)} />
        <CarouselButton className="nextElHero" />
      </div>

      <CarouselPagination className={clsx("custom-pagination-hero", styles.pagination)}/>  
    </section>
  )
}