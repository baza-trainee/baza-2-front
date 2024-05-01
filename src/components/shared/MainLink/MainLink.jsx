"use client";

import { Link } from "@/src/navigation";
import styles from "./MainLink.module.scss";
import linkTypes from "./constants";

const MainLink = ({ url, children, type = linkTypes.DEFAULT }) => {
  const linkClass = `${styles.link} ${styles[`link--${type}`]}`;
  const scrollToBottom = (event) => {
    if (url === "/contacts") {
      event.preventDefault();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <Link href={url} className={linkClass} onClick={scrollToBottom}>
      {children}
    </Link>
  );
};
export default MainLink;
