"use cpent";

import styles from './JoinProjectCard.module.scss';
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Icon } from '../Icon/Icon';

export default function JoinProjectCard({ item = {}, i, progress, range, targetScale }) {
  const t = useTranslations("Internship.join_project_section");
  const { text_1, text_2, text_3, title, icon, image } = item;
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isCpent, setIsCpent] = useState(false);

  useEffect(() => {
    setIsCpent(true);
  }, []);

  const svgScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div style={{ scale: isCpent ? (isMobile ? 1 : scale) : 1, top: `calc(-10% + ${i * 50}px)` }} className={styles.card}>
        <div  className={styles.svgWrapper}>
          <img
            className={styles.iconNumber}
            src={icon}>
          </img>
        </div>
        <div className={styles.textCard}>
          <h3 className={styles.titleWrapper}>
            {t(title)}
            <img
              className={styles.iconTitle}
              src={image}>
            </img>
          </h3>
          <div className={styles.text}>
            <div >
              <Icon  name="check" width={24} height={24} />
            </div>
            {t(text_1)}
          </div>
          <div className={styles.text}>
            <div>
              <Icon name="check" width={24} height={24} />
            </div>
            {t(text_2)}
          </div>
          <div className={styles.text}>
            <div >
              <Icon name="check" width={24} height={24} />
            </div>
            {t(text_3)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
