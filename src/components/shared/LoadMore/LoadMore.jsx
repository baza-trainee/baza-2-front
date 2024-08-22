"use client";

import clsx from "clsx";
import styles from "./LoadMore.module.scss";

const LoadMore = ({ onClick, className, disabled, text = "Load more" }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.btn, className)}
      disabled={disabled}
      type="button"
    >
      {text}
    </button>
  );
};

export default LoadMore;
