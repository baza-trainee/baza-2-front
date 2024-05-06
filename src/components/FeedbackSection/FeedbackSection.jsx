"use client";

import Carousel from "../shared/Carousel/Carousel";
import FeedbackCard from "../shared/FeedbackCard/FeedbackCard";
import { Navigation, Pagination } from "swiper/modules";
import CarouselButton from "../shared/Carousel/CarouselButton/CarouselButton";
import CarouselPagination from "../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import styles from "./FeedbackSection.module.scss";

const items = [
  {
    name: "Олена",
    image: "../shared/FeedbackCard/images/Img.jpg",
    role: "учасниця, QA",
    date: "червень 2023",
    text: "Я останні два тижні щодня думаю про те, що на Базу варто було прийти мінімум для того, щоб усвідомити значущість роботи дизайнера в розробці ПЗ",
  },
  {
    name: "Марина",
    image: "../shared/FeedbackCard/images/Img.jpg",
    role: "учасниця, QA",
    date: "червень 2023",
    text: "Я останні два тижні щодня думаю про те, що на Базу варто було прийти мінімум для того, щоб усвідомити значущість роботи дизайнера в розробці ПЗ",
  },
  {
    name: "Катерина",
    image: "../shared/FeedbackCard/images/Img.jpg",
    role: "учасниця, QA",
    date: "червень 2023",
    text: "Я останні два тижні щодня думаю про те, що на Базу варто було прийти мінімум для того, щоб усвідомити значущість роботи дизайнера в розробці ПЗ",
  },
  {
    name: "Єлізавета",
    image: "../shared/FeedbackCard/images/Img.jpg",
    role: "учасниця, QA",
    date: "червень 2023",
    text: "Я останні два тижні щодня думаю про те, що на Базу варто було прийти мінімум для того, щоб усвідомити значущість роботи дизайнера в розробці ПЗ",
  },
];
const FeedbackSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Учасники про нас</h2>
        <div className={styles.navigation}>
          <CarouselButton className={clsx("prevBtn", styles.prevBtn)} />
          <CarouselButton className="nextBtn" />
        </div>

        <Carousel
          modules={[Navigation, Pagination]}
          paginationEl={".custom-pagination1"}
          items={items}
          prevEl={".prevBtn"}
          nextEl={".nextBtn"}
          renderItem={(item) => <FeedbackCard {...item} />}
        />
        <CarouselPagination className="custom-pagination1" />
      </div>
    </section>
  );
};

export default FeedbackSection;
