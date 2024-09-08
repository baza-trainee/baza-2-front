"use client";

import { useRouter } from "@/src/navigation";
import styles from "./BackBtn.module.scss";
import { Icon } from "../../../shared/Icon/Icon";
import { useTranslations } from "next-intl";

const BackBtn = () => {
  const t = useTranslations("Blog");
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={styles.btn}>
      <Icon name="carousel-arrow" className={styles.goBackIcon} />
      <span>{t("back_btn")}</span>
    </button>
  );
};

export default BackBtn;
