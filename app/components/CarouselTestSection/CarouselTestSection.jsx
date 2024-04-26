"use client"
import Carousel from "../Carousel/Carousel"
import CarouselButton from "../Carousel/CarouselButton/CarouselButton"
import CarouselPagination from "../Carousel/CarouselPagination/CarouselPagination"
import { Navigation, Pagination } from "swiper/modules"
import styles from "./CarouselTestSection.module.scss"
import clsx from "clsx"

const CarouselTestSection = () => {
  const items = [
    { content: "slide 1" },
    { content: "slide 2" },
    { content: "slide 3" },
    { content: "slide 4" },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Title</h2>
          <div className={styles.navigation}>
            <CarouselButton className={clsx("prevEl", styles.prevEl)} />
            <CarouselButton className="nextEl" />
          </div>
        </div>
        <Carousel
          modules={[Navigation, Pagination]}
          paginationEl={".custom-pagination"}
          items={items}
          prevEl={".prevEl"}
          nextEl={".nextEl"}
          renderItem={item => <div>{item.content}</div>}
        />
        <CarouselPagination className="custom-pagination" />
      </div>
    </section>
  )
}

export default CarouselTestSection
