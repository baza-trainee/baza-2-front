"use client";
import clsx from "clsx";
import { useRef, useState } from "react";
import styles from "./FAQItem.module.scss";
import MainLink from "../../../shared/MainLink/MainLink";
import linkTypes from "../../../shared/MainLink/constants";

const FAQItem = ({ title, description, descLink }) => {
  const [showMore, setShowMore] = useState(false);
  const descRef = useRef(null);
  const descWrapperRef = useRef(null);

  const toggleDescription = () => {
    setShowMore((prev) => !prev);
    if (descRef.current && descWrapperRef.current) {
      const descHeight = descRef.current.scrollHeight;
      descWrapperRef.current.style.maxHeight = showMore ? 0 : `${descHeight}px`;
    }
  };

  return (
    <div className={styles.faqItem}>
      <div onClick={toggleDescription} className={styles.titleRow}>
        <h3 className={styles.title}>{title}</h3>
        <button className={clsx(styles.plus, showMore && styles.plusActive)}>
          <span />
          <span />
        </button>
      </div>
      <div
        ref={descWrapperRef}
        className={clsx(
          styles.descWrapper,
          showMore && styles.descWrapperActive
        )}
      >
        <p ref={descRef} className={styles.desc}>
          {description}
          {descLink && (
            <MainLink url="/internship" className={styles.link}>
              {descLink}
            </MainLink>
          )}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
