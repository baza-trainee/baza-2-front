"use client"

import { useTranslations } from 'next-intl';
import StructureCardTest from '../shared/StructureCardTest/StructureCardTest';
import styles from './StructureSection.module.scss';
import { items } from './items';

export default function StructureSectionTest() {
  const t = useTranslations("Main.our_structure_section");

  return(
    <div className={styles.mainContainer}>
        <div className={styles.text}>
          <p>{t("title")}</p>
        </div>
        <div className={styles.cardContainer}>
        {items.map((item) => (
        <StructureCardTest key={Date.now()} item={item} />
      ))}
        </div>
    </div>
  )
}