"use client";
import clsx from "clsx";
import { useState } from "react";
import styles from "./FAQItem.module.scss";

const FAQItem = ({ title, description }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      onClick={() => setShowMore((prev) => !prev)}
      className={styles.faqItem}
    >
      <div className={styles.titleRow}>
        <p className={styles.title}>{title}</p>
        <button className={clsx(styles.plus, showMore && styles.plusActive)}>
          <span />
          <span />
        </button>
      </div>
      <p className={clsx(styles.desc, showMore && styles.descActive)}>
        {description}
      </p>
    </div>
  );
};

export default FAQItem;
