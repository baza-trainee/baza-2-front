"use client";

import Advantage from "../../shared/Advantage/Advantage";
import { items } from "./Items";
import styles from "./AdvantagesSection.module.scss";
import ControlBtnRegistrationFormModal from "../../shared/controlButtons/ControlBtnRegistrationFormModal";
import { useTranslations } from "next-intl";

const AdvantagesSection = () => {
  const t = useTranslations("Internship.benefits_internship");
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{t("title")}</h3>
      <ul className={styles.list}>
        {items.map(({ img, text }) => (
          <li key={img}>
            <Advantage img={img} text={text} />
          </li>
        ))}
      </ul>
      {/* <div className={styles.button}>
        <ControlBtnRegistrationFormModal type="partaker">
          {t("btn_text")}
        </ControlBtnRegistrationFormModal>
      </div> */}
    </div>
  );
};
export default AdvantagesSection;
