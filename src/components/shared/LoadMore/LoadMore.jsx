"use client";

import clsx from "clsx";
import styles from "./LoadMore.module.scss";

const LoadMore = ({ onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.btn, className)}
      disabled={disabled}
      type="button"
    >
      Load more
    </button>
  );
};

export default LoadMore;
