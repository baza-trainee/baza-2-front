"use client";

import { useTranslations } from "next-intl";
import StructureCard from "../shared/StructureCard/StructureCard";
import styles from "./StructureSection.module.scss";
import { items } from "./items";

export default function StructureSection() {
  const t = useTranslations("Main.our_structure_section");

  return (
    <section className={styles.mainContainer}>
      <div className={styles.text}>
        <p>{t("title")}</p>
      </div>
      <div className={styles.cardContainer}>
        {items.map((item) => (
          <StructureCard key={Date.now()} item={item} />
        ))}
      </div>
    </section>
  );
}
