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

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 20,
    restDelta: 0.001,
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollCenter = window.scrollY + window.innerHeight / 2;

      let newIndex = -1;
      itemsRef.current.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top + window.scrollY;
        if (scrollCenter >= itemTop) {
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
    <div ref={sectionRef} className={styles.wrapper}>
      <div className={styles.timeline}>
        <div
          className={styles.timeline__initial}
          style={{ height: `calc(100% - ${lastElHeight}px)` }}
        >
          <motion.div
            style={{
              scaleY: scrollYProgressSpring,
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
