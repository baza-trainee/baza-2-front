"use client";

import styles from './JoinProjectCard.module.scss';
import { useTranslations } from "next-intl";
import { Icon } from '../Icon/Icon';
import {motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

export default function JoinProjectCard({ item = {}, i, progress, range, targetScale}) {
  const t = useTranslations("Internship.join_project_section");
  const { text_1, text_2, text_3, title, icon, image } = item;
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })
  const svgScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const cardScale = useTransform(progress, range, [1, targetScale])
  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div style={{scale: cardScale, top: `calc(-10% + ${i * 50}px)`}} className={styles.card}>
        <motion.div style={{scale: svgScale}} className={styles.svGWrapper}>
          <img
            className={styles.icon}  
            height={324}  
            width={145}
            src={icon}>
          </img>
        </motion.div>
        <div className={styles.textCard}>
          <div className={styles.titleWrapper}>
            {t(title)}
            <img
              height={32}  
              width={33}
              src={image}>
            </img>
          </div>
          <div className={styles.textWrapper}>
          <div className={styles.text}>
              <div className={styles.checkboxWrapper}>
                <Icon name="check" width={24} heigth={24}/>
              </div>
              {t(text_1)}
            </div>
            <div className={styles.text}>
              <div className={styles.checkboxWrapper}>
                <Icon name="check" width={24} heigth={24}/>
              </div>
              {t(text_2)}
            </div>
            <div className={styles.text}>
              <div className={styles.checkboxWrapper}>
                <Icon name="check" width={24} heigth={24}/>
              </div>
              {t(text_3)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
