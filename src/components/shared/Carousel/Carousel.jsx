// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import { useCallback } from "react";
// import "swiper/css";
// import { EffectCoverflow, Autoplay } from "swiper/modules";

// const Carousel = ({
//   modules,
//   className,
//   slideClassName,
//   renderItem,
//   items,
//   prevEl,
//   nextEl,
//   paginationEl,
//   delay = 3000,
//   useCoverflow = false, 
//   useAutoplay = false,
//   ...options
// }) => {
//   const renderSlides = useCallback(
//     (items) =>
//       items?.map((item, i) => (
//         <SwiperSlide className={slideClassName} key={i}>
//           {renderItem(item, i)}
//         </SwiperSlide>
//       )),
//     [slideClassName, renderItem]
//   );

//   const DEFAULT_MODULES = [Navigation, Autoplay];

//   return (
//     <Swiper
//       // modules={[
//       //   ...(modules ?? DEFAULT_MODULES), 
//       //   ...(useCoverflow ? [EffectCoverflow] : []),
//       //  ...(useAutoplay ? [Autoplay] : []),
//       //  ]}
//       modules={[...(modules ?? DEFAULT_MODULES)]}
//       navigation={{
//         prevEl: prevEl,
//         nextEl: nextEl,
//       }}
//       pagination={{
//         el: paginationEl ?? null,
//         clickable: true,
//       }}
//       // autoplay={
//       //   useAutoplay ? {
//       //   delay: delay,
//       //   disableOnInteraction: false,
//       // } : false }

//       autoplay={{
//         delay: delay,
//         disableOnInteraction: false,
//       }}

//       speed={700}
//       className={className}
//       {...options}

//       effect={useCoverflow ? 'coverflow' : 'slide'} 
//       grabCursor={useCoverflow}
//       centeredSlides={useCoverflow}
//       loop={true}
//       coverflowEffect={
//         useCoverflow
//           ? {
//               rotate: 0,
//               stretch: 0,
//               depth: 100,
//               modifier: 2.5,
//             }
//           : {}
//       }
//     >
//       {renderSlides(items)}
//     </Swiper>
//   );
// };

// export default Carousel;


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
  // slidesPerView: slidesPerViewProp = 1,
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
      speed={700}
      // slidesPerView={slidesPerViewProp}
      className={className}
      {...options}
    >
      {renderSlides(items)}
    </Swiper>
  );
};

export default Carousel;