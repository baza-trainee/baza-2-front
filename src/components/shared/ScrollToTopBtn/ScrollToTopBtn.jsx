"use client";
import { useState, useEffect } from "react";
import styles from "./ScrollToTopBtn.module.scss";

const ScrollToTopBtn = () => {
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
    toggleVisible();

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
        <svg
          width="23"
          height="27"
          viewBox="0 0 25 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.0359831 12.4994L11.7032 0.402191L12.0648 0.0273333L12.4246 0.403834L24.0366 12.554L23.3136 13.2449L12.5605 1.99343L12.5012 28.0288L11.5012 28.0265L11.5605 1.99065L0.755765 13.1936L0.0359831 12.4994Z"
            fill="url(#paint0_linear_2137_6054)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2137_6054"
              x1="0.0644531"
              y1="0"
              x2="2.03443"
              y2="34.9901"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E37CC1" />
              <stop offset="0.365" stopColor="#E231A8" />
              <stop offset="0.76" stopColor="#9D2F79" />
              <stop offset="1" stopColor="#851A62" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </>
  );
};

export default ScrollToTopBtn;
