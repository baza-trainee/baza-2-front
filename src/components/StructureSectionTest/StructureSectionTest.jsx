"use client"

import { useTranslations } from 'next-intl';
import StructureCardTest from '../shared/StructureCardTest/StructureCardTest';
import styles from './StructureSection.module.scss';
import { items } from './items';
import { createKey } from '@/src/lib/utils/createKey';

export default function StructureSectionTest() {
  const t = useTranslations("Main.our_structure_section");

  return(
    <section className={styles.mainContainer}>
        <div className={styles.text}>
          <p>{t("title")}</p>
        </div>
        <div className={styles.cardContainer}>
        {items.map((item) => (
        <StructureCardTest key={createKey()} item={item} />
      ))}
        </div>
    </section>
  )
}