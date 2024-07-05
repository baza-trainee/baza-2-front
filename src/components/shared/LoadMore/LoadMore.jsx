"use client";

import styles from "./LoadMore.module.scss";

const LoadMore = ({onClick}) => {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      type="button"
    >
      Load more
    </button>
  );
};

export default LoadMore;
