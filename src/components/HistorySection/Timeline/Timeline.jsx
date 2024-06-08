"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import data from "./data";
import styles from "./timeline.module.scss";

const Timeline = () => {
  const t = useTranslations("Main.history_project_section.history");

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
      const scrollCenter = window.scrollY + windowHeight / 2;

      const fill = Math.max(
        Math.min(scrollCenter - sectionTop, sectionHeight),
        0
      );
      setFillHeight(fill);

      let newIndex = -1;
      itemsRef.current.forEach((item, index) => {
        const itemTop =
          item.getBoundingClientRect().top + window.scrollY - sectionTop;
        if (fill >= itemTop) {
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
            style={{ height: `${fillHeight}px` }}
            className={clsx(styles.timeline__draw)}
          />
        </div>

        <ul className={styles.timeline__list}>
          {data.map((item, index) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
