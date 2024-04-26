"use client";
import { useState, useEffect } from "react";
import styles from "./ScrollToTopBtn.module.scss";
import Image from "next/image";

export const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = window.scrollY;
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={
          isVisible ? styles.scrollToTopBtnActive : styles.scrollToTopBtn
        }
        type="button"
      >
        <Image
          className={styles.iconArrow}
          width={25}
          height={29}
          alt="button to top"
          src="/images/arrow.svg"
        />
      </button>
    </>
  );
};
