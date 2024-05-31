"use client";
  
import JoinProjectCard from '../shared/JoinProjectCard/JoinProjectCard';
import styles from './JoinProjectSection.module.scss';
import  { items } from './items';
import { useTranslations } from "next-intl";
import  { motion, useScroll } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function JoinProjectSection () {
  const t = useTranslations("How_we_work.join_project_section");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  return(
    <section ref={container} className={styles.container}>
      <div className={styles.titleWrapper }>{t("main_title")}</div>
      {items.map((item, i) => {
      const targetScale = 1 - ((items.length - i) * 0.05);
      return <JoinProjectCard key={i} i={i} {...item} progress={scrollYProgress} item={item} range={[i * 0.25, 1]} targetScale={targetScale}/>
      })}
    </section>
  )
}

