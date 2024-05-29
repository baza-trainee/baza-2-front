"use client";
import JoinProjectCard from '../shared/JoinProjectCard/JoinProjectCard';
import styles from './JoinProjectSection.module.scss';
import  { items } from './items';
import { useTranslations } from "next-intl";

export default function JoinProjectSection () {
  const t = useTranslations("How_we_work.join_project_section");

  return(
    <section className={styles.container}>
      <div>{t("title")}</div>
      {items.map((item, index) => {
      return <JoinProjectCard key={index} item={item}/>
      })}
    </section>
  )
}

