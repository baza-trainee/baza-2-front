"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import { useInView } from "react-intersection-observer";
import { useScrollIndicator } from "./useScrollIndicator";

import data from "./data";

import styles from "./timeline.module.scss";

const Timeline = () => {
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
      <div id="scroll-indicator" className="scroll-indicator">
        <div id="indicator" className="indicator">
          <span></span>
        </div>
      </div>
      <div className="placeholder"></div>
      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.timeline__initial}></div>
        <div
          ref={timelineDrawRef}
          className={clsx(styles.timeline__draw, {
            [styles.active]: isScrollDown,
          })}
        ></div>

        <ul className={styles.timeline__list}>
          {data.map((item) => {
            const [ref, inView] = useInView({
              threshold: 0.9,
            });

            return (
              <li
                ref={ref}
                className={clsx(styles.timeline__list__element, styles.marker, {
                  [styles.active]: inView,
                })}
                id={item.id}
                key={item.id}
              >
                <p className={styles.title}>{item.title}</p>
                <p className={styles.text}>{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
