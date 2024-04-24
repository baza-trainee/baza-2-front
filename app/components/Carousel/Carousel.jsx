import { random, SwiperSlide } from 'swiper/react'

const Carousel = () => {
	return (
		<Swiper
      spaceBetween={50}
      slidesPerView={1}

    >
      						<SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      								<SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
													{randomFunction()}
    </Swiper>
	)
}

export default Carousel