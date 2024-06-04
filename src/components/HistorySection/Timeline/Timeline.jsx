"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
// import { useScrollIndicator } from "./useScrollIndicator";
import data from "./data";
import styles from "./timeline.module.scss";

const Timeline = () => {
  const t = useTranslations("Main.history_project_section.history");
  // const [isScrollDown, setIsScrollDown] = useState(false);
  // const timelineRef = useRef(null);
  // const timelineDrawRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolledFurther = window.scrollY > 0;
  //     setIsScrollDown(scrolledFurther);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // useScrollIndicator(timelineRef, timelineDrawRef);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollCenter = scrollY + windowHeight / 2;

      const startFill = Math.max(sectionTop - windowHeight / 2, 0);
      const endFill = sectionTop + sectionHeight - windowHeight / 2;

      const fillPercent = Math.min(
        Math.max((scrollCenter - startFill) / (endFill - startFill), 0),
        1
      );

      setFillHeight(fillPercent * 100);

      let newIndex = -1;
      itemsRef.current.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top + window.scrollY;
        if (scrollCenter >= itemTop) {
          newIndex = index;
        }
      });

      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div ref={sectionRef} className={styles.wrapper}>
      <div className={styles.timeline}>
        <div className={styles.timeline__initial}>
          <div
            style={{ height: `${fillHeight}%` }}
            className={clsx(styles.timeline__draw)}
          />
        </div>

        <ul className={styles.timeline__list}>
          {data.map((item, index) => {
            // const [ref, inView] = useInView({
            //   threshold: 0.9,
            // });

            return (
              <li
                ref={(el) => (itemsRef.current[index] = el)}
                className={clsx(
                  styles.timeline__list__element,
                  activeIndex >= index && styles.active
                )}
                style={{ gridRow: ++index }}
                id={item.id}
                key={item.id}
              >
                <h3 className={clsx(styles.title, styles.marker)}>
                  {t(`${item.id}.${item.title}`)}
                </h3>
                <p className={styles.text}>{t(`${item.id}.${item.text}`)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
