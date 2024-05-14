"use client";

import { useTranslations } from "next-intl";
import StructureCard from "./StructureCard/StructureCard";
import styles from "./StructureSection.module.scss";
import { items } from "./items";
import { createKey } from "../../lib/utils/createKey";

export default function StructureSection() {
  const t = useTranslations("Main.our_structure_section");

  return (
    <section className={styles.mainContainer}>
      <div className={styles.text}>
        <h1>{t("title")}</h1>
      </div>
      <div className={styles.cardContainer}>
        {items.map((item) => {
          const cardKey = createKey();
          return <StructureCard key={cardKey} item={item} />;
        })}
      </div>
    </section>
  );
}
