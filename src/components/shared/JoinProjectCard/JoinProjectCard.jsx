"use client";

import styles from './JoinProjectCard.module.scss';
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Icon } from '../Icon/Icon';
import { createKey } from "@/src/lib/utils/createKey";


export default function JoinProjectCard({ item = {}, i, progress, range, targetScale }) {
  const t = useTranslations("Internship.join_project_section");
  const { title, icon, image, texts, name } = item;
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const isMobile = useMediaQuery({ maxWidth: 990 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const svgScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div style={{ scale: isClient ? (isMobile ? 1 : scale) : 1, top: `calc(-10% + ${i * 50}px)` }} className={styles.card}>
        <div  className={styles.svgWrapper}>
          <img
            className={styles.iconNumber}
            src={icon}
            alt={name}
          />
        </div>
        <div className={styles.textCard}>
          <span className={styles.titleWrapper}>
            {t(title)}
            <img
              className={styles.iconTitle}
              src={image}
              alt={t(title)}
            />
          </span>
          {texts.map((text) => (
            <ul key={createKey()} className={styles.text}>
              <div>
                <Icon name="check" width={24} height={24} />
              </div>
              {t(text)}
            </ul>
          ))}
        </div>
      </motion.div>
    </div>
  );
}