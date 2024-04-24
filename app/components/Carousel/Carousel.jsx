"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import clsx from "clsx"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "./Carousel.module.scss"
import { useRef, useCallback } from "react"

const DEFAULT_MODULES = [Navigation]

const Carousel = ({ modules, className, options, slideClassName, renderItem, items }) => {
  const prevElRef = useRef(null)
  const nextElRef = useRef(null)

  const renderSlides = useCallback(
    items =>
      items?.map((item, i) => (
        <SwiperSlide className={slideClassName} key={i}>
          {renderItem(item, i)}
        </SwiperSlide>
      )),
    [slideClassName, renderItem]
  )

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[...(modules ?? DEFAULT_MODULES)]}
      navigation
      className={clsx(styles.slider, className)}
      {...options}
    >
      {renderSlides(items)}
    </Swiper>
  )
}

export default Carousel
