import Image from "next/image";
import { useTranslations } from "next-intl";
import ControlBtnRegistrationFormModal from "../../shared/controlButtons/ControlBtnRegistrationFormModal";
import styles from "./MentorSection.module.scss";

const MentorSection = () => {
  const t = useTranslations("Main.mentor_section");
  
  return (
    <section className={styles.mentor}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("title")}</h2>

        <div className={styles.wrapper}>
          <div className={styles.text}>
            <p className={styles.text_mb}>{t("paragraph_1")}</p>
            <p className={styles.text_mb}>{t("paragraph_2")}</p>
            <p>{t("paragraph_3")}</p>
          </div>

          <div className={styles.wrapper_img}>
            <Image
              className={styles.image}
              src={"/images/mentor_section/mentor.png"}
              fill
              sizes="100%"
              alt={t("title")}
              quality={80}
            />
          </div>
        </div>

        <ControlBtnRegistrationFormModal>
          {t("btn_mentor")}
        </ControlBtnRegistrationFormModal>
      </div>
    </section>
  );
};

export default MentorSection;
