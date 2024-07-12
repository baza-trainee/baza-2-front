"use client";

import { useRouter } from "@/src/navigation";
import styles from "./BackBtn.module.scss";
import { Icon } from "../Icon/Icon";

const BackBtn = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={styles.btn}>
      <Icon name="carousel-arrow" className={styles.goBackIcon} />
      <span>Повернутись до статей</span>
    </button>
  );
};

export default BackBtn;
