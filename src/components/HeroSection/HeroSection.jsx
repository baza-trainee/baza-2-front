"use client";
import styles from './HeroSection.module.scss'
import clsx from "clsx";
import { Navigation, Pagination,Autoplay } from "swiper/modules";
import Carousel from '../shared/Carousel/Carousel';
import CarouselButton from '../shared/Carousel/CarouselButton/CarouselButton';
import CarouselPagination from '../shared/Carousel/CarouselPagination/CarouselPagination';
import { HeroCard } from '../shared/HeroCard/HeroCard';
//title, desc, img 
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
          modules={[Navigation, Pagination,Autoplay]}
          paginationEl={".custom-pagination1"}
          items={items}
          prevEl={".prevEl1"}
          nextEl={".nextEl1"}
          renderItem={(item) => <HeroCard title={item.title} desc={item.desc} img={item.img}/>}
        />
        <div className={styles.navigation}>
          <div className={styles.buttons}>
            <CarouselButton className={clsx("prevEl1", styles.prevEl)} />
            <CarouselButton className="nextEl1" />
          </div>
          <CarouselPagination className={clsx("custom-pagination1", styles.pagination)}/>
        </div>

       
    </section>
  )
}