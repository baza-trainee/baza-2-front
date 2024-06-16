"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import clsx from "clsx";
import data from "./data";
import styles from "./timeline.module.scss";

const Timeline = () => {
  const t = useTranslations("Main.history_project_section.history");
  const sectionRef = useRef(null);
  const [lastElHeight, setLastElHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  //расскоментировать если нужно анимированое заполнение полосы (осторожно, может не коректо работать изза анимаций!!!)
  // const scrollYProgressSpring = useSpring(scrollYProgress, {
  //   stiffness: 110,
  //   damping: 20,
  //   restDelta: 0.001,
  // });

  const [activeIndex, setActiveIndex] = useState(null);
  const itemsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const lineHeight = lineRef.current.getBoundingClientRect().height;

      let newIndex = -1;
      itemsRef.current.forEach((item, index) => {
        const itemTop =
          item.getBoundingClientRect().top + window.scrollY - sectionTop;
        console.log(itemTop);
        if (lineHeight > itemTop) {
          newIndex = index;
        }
        if (index + 1 === itemsRef.current.length) {
          setLastElHeight(item.offsetHeight);
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
    <div className={styles.wrapper}>
      <div ref={sectionRef} className={styles.timeline}>
        <div
          className={styles.timeline__initial}
          style={{ height: `calc(100% - ${lastElHeight - 5}px)` }}
        >
          <motion.div
            ref={lineRef}
            style={{
              scaleY: scrollYProgress,
            }}
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
              style={{ gridRow: index + 1 }}
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
