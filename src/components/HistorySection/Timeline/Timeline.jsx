"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import clsx from "clsx";

import { useInView } from "react-intersection-observer";
import { useScrollIndicator } from "./useScrollIndicator";

import data from "./data";

import styles from "./timeline.module.scss";

const Timeline = () => {
  const t = useTranslations("Main.history_project_section.history");
  const [isScrollDown, setIsScrollDown] = useState(false);
  const timelineRef = useRef(null);
  const timelineDrawRef = useRef(null);

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

  useScrollIndicator(timelineRef, timelineDrawRef);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timeline}>
        <div ref={timelineRef} className={styles.timeline__initial}>
          <div
            ref={timelineDrawRef}
            className={clsx(
              styles.timeline__draw,
              isScrollDown && styles.active
            )}
          />
        </div>

        <ul className={styles.timeline__list}>
          {data.map((item, i) => {
            const [ref, inView] = useInView({
              threshold: 0.9,
            });

            return (
              <li
                ref={ref}
                className={clsx(
                  styles.timeline__list__element,
                  inView && styles.active
                )}
                style={{ gridRow: ++i }}
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
