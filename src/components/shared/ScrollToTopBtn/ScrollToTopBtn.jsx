"use client";
import { useState, useEffect } from "react";
import styles from "./ScrollToTopBtn.module.scss";
import Image from "next/image";
import { Icon } from "../Icon/Icon";

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
        <Icon
          name="scroll-top-arrow"
          width={25}
          height={29}
          alt="button to top"
        />
      </button>
    </>
  );
};
