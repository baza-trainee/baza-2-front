"use client"
import { Pagination, Navigation } from "swiper/modules"
import Carousel from "./components/Carousel/Carousel"
import CarouselButton from "./components/Carousel/CarouselButton/CarouselButton"
import CarouselPagination from "./components/Carousel/CarouselPagination/CarouselPagination"
import styles from './page.module.scss'

export default function Home() {
	const items = [
		{ content: "slide 1" },
		{ content: "slide 2" },
		{ content: "slide 3" },
		{ content: "slide 4" },
	]

	return (
		<main>
			<section className={styles.section}>
				<div className={styles.container}>
					<div className={styles.titleRow}>
						<h2 className={styles.title}>Title</h2>
						<div className={styles.navigation}>
							<CarouselButton className={styles.prevEl} />
							<CarouselButton className="nextEl" />
						</div>
					</div>
					<Carousel
						modules={[Navigation, Pagination]}
						paginationEl={".custom-pagination"}
						items={items}
						prevEl={styles.prevEl}
						nextEl={".nextEl"}
						renderItem={item => <div>{item.content}</div>}
					/>
					<CarouselPagination className='custom-pagination' />
				</div>
			</section>
		</main>
	)
}
