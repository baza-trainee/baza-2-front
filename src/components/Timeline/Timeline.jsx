"use client";
import { useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";
import styles from "./timeline.module.scss";

const Timeline = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledFurther = window.scrollY > 0;
      setIsScrollDown(scrolledFurther);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeline = document.querySelector(`.${styles.timeline}`);
    const timelineDraw = document.querySelector(`.${styles.timeline__draw}`);
    const timelineElements = document.querySelectorAll(
      `.${styles.timeline__list__element}`
    );
    const bodyRect = document.body.getBoundingClientRect();

    if (!timeline || !timelineDraw || !timelineElements.length) {
      return;
    }

    const timelineOffset = timeline.getBoundingClientRect().top - bodyRect.top;

    var moveIndicator = function () {
      var viewportHeight = window.innerHeight;
      var hasScrolled = window.pageYOffset;
      const scrolledFurther =
        hasScrolled - timelineOffset + viewportHeight / 1.3;

      if (scrolledFurther && scrolledFurther > 0) {
        if (scrolledFurther > timeline.clientHeight) {
          timelineDraw.style.height = `${timeline.clientHeight}px`;
          return;
        }

        timelineDraw.style.height = `${scrolledFurther}px`;
        return;
      }

      timelineDraw.style.height = "0px";
    };

    window.addEventListener("scroll", moveIndicator);
    window.addEventListener("resize", moveIndicator);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div id="scroll-indicator" className="scroll-indicator">
        <div id="indicator" className="indicator">
          <span></span>
        </div>
      </div>
      <div className="placeholder"></div>
      <div className={styles.timeline}>
        <div className={styles.timeline__initial}></div>
        <div className={styles.timeline__draw}></div>

        <div className={styles.timeline__list}>
          <Scrollspy
            items={["item1", "item2", "item3", "item4", "item5"]}
            currentClassName={isScrollDown ? styles.active : ""}
            className={styles.timeline__list}
            offset={-700}
          >
            <div className={styles.timeline__list__element} id="item1">
              <p className={styles.title}>Квітень 2023: </p>
              <p className={styles.text}>Старт проєкту Baza Trainee Ukraine</p>
            </div>
            <div className={styles.timeline__list__element} id="item2">
              <p className={styles.title}>Серпень 2023: </p>
              <p className={styles.text}>
                Перша тисяча заявок від учасників загалом на 17 різноманітних
                проєктів, 8 менторів
              </p>
            </div>
            <div className={styles.timeline__list__element} id="item3">
              <p className={styles.title}>Листопад 2023: </p>
              <p className={styles.text}>
                Чотири лендінги з військових зборів закумулювали понад 200 тис
                грн, більше 50 працевлаштованих джунів{" "}
              </p>
            </div>
            <div className={styles.timeline__list__element} id="item4">
              <p className={styles.title}>Грудень 2023: </p>
              <p className={styles.text}>
                Кількість учасників зросла до 1700. Успішно завершено 35
                проєктів.
              </p>
            </div>
            <div className={styles.timeline__list__element} id="item5">
              <p className={styles.title}>Березень 2024: </p>
              <p className={styles.text}>
                Під час нашої роботи ми спостерігаємо ускладнення рівню проєктів
                — від простих лендінгів до повноцінних сайтів з складними
                внутрішніми блоками{" "}
              </p>
            </div>
          </Scrollspy>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
