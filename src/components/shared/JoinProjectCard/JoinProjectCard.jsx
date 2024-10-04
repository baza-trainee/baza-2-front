"use client";

import styles from './JoinProjectCard.module.scss';
import { useTranslations } from "next-intl";
import { motion, useTransform } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Icon } from '../Icon/Icon';
import { createKey } from "@/src/lib/utils/createKey";


export default function JoinProjectCard({ item = {}, i, progress, range, targetScale }) {
  const t = useTranslations("Internship.join_project_section");
  const { title, icon, image, texts, name } = item;
  const container = useRef(null);


  const isMobile = useMediaQuery({ minWidth: 990 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div style={{
    scale: isClient ? (isMobile ? scale : 1) : 1,
    top: `calc(-10% + ${i * 25}px)`
  }} className={styles.card}>
        <div  className={styles.svgWrapper}>
          <img
            className={styles.iconNumber}
            src={icon}
            alt={t(name)}
          />
        </div>
        <div className={styles.textCard}>
          <h3 className={styles.titleWrapper}>
            {t(title)}
            <img
              className={styles.iconTitle}
              src={image}
              alt={t(title)}
            />
          </h3>
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