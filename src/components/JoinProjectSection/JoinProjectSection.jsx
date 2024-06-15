"use client";

import JoinProjectCard from "../shared/JoinProjectCard/JoinProjectCard";
import styles from "./JoinProjectSection.module.scss";
import { items } from "./items";
import { useTranslations } from "next-intl";
import { motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function JoinProjectSection() {
  const t = useTranslations("Internship.join_project_section");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // Видалення екземпляру lenis
    return ()=> lenis.destroy()
  }, []);

  return (
    <section ref={container} className={styles.container}>
      <h2 className={styles.titleWrapper}>{t("main_title")}</h2>
      {items.map((item, i) => {
        const targetScale = 1 - (items.length - i) * 0.05;
        return (
          <JoinProjectCard
            key={i}
            i={i}
            {...item}
            progress={scrollYProgress}
            item={item}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}
