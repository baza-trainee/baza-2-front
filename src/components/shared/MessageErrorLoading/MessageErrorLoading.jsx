import styles from "./MessageErrorLoading.module.scss";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function MessageErrorLoading({ variant = "main", className }) {
  // main | admin | search
  const t = useTranslations("ErrorMessageLoading");

  const getMessage = (variant) => {
    const message = {};
    if (variant == "main") {
      message.text1 = t("title");
      message.text2 = t("text");
    }

    if (variant == "admin") {
      message.text1 = "Помилка завантаження контенту.";
      message.text2 = "Оновіть сторінку або спробуйте пізніше.";
    }

    if (variant == "search") {
      message.text1 = "Вибачте, інформації не знайдено.";
      message.text2 = "Уточніть запит або додайте контент.";
    }

    return message;
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <p className={styles.error}>{getMessage(variant).text1}</p>
      <p className={styles.error}>{getMessage(variant).text2}</p>
    </div>
  );
}
