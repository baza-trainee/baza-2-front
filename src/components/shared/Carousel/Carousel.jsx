"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useCallback } from "react";
import "swiper/css";

const Carousel = ({
  modules,
  className,
  slideClassName,
  renderItem,
  items,
  prevEl,
  nextEl,
  paginationEl,
  delay,
  ...options
}) => {
  const renderSlides = useCallback(
    (items) =>
      items?.map((item, i) => (
        <SwiperSlide className={slideClassName} key={i}>
          {renderItem(item, i)}
        </SwiperSlide>
      )),
    [slideClassName, renderItem]
  );
  const DEFAULT_MODULES = [Navigation];

  return (
    <Swiper
      modules={[...(modules ?? DEFAULT_MODULES)]}
      navigation={{
        prevEl: prevEl,
        nextEl: nextEl,
      }}
      pagination={{
        el: paginationEl ?? null,
        clickable: true,
      }}
      autoplay={{
        delay: delay,
        disableOnInteraction: false,
      }}
      className={className}
      {...options}
    >
      {renderSlides(items)}
    </Swiper>
  );
};

export default Carousel;
