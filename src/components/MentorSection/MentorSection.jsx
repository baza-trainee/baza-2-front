import Image from "next/image";
import img from "./Images/image.jpg"
import { useTranslations } from "next-intl";

import styles from "./MentorSection.module.scss";
import ControlBtnRegistrationFormModal from "../shared/controlButtons/ControlBtnRegistrationFormModal";

const MentorSection = () => {
  const t = useTranslations("Main.mentor_section");
  return (
    <section className={styles.mentor}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("title")}</h1>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <p>
              {t("paragraph_1")}
            </p>
            <p>
              {t("paragraph_2")}
            </p>
            <p>
              {t("paragraph_3")}
            </p>
          </div>
          <Image
            className={styles.image}
            src={img}
            width={628}
            height={496}
            alt="About mentor team"
          />
        </div>
        <ControlBtnRegistrationFormModal>
          {t("btn_mentor")}
        </ControlBtnRegistrationFormModal>
      </div>
    </section>
  );
};

export default MentorSection;
