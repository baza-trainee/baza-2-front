import React from "react";
import { items } from "./items";
import RoleCard from "../shared/RoleCard/RoleCard";
import ControlBtnRegistrationFormModal from "../shared/controlButtons/ControlBtnRegistrationFormModal";
import { useTranslations } from "next-intl";
import { createKey } from "@/src/lib/utils/createKey";
import styles from "./RoleSection.module.scss";

const RoleSection = () => {
  const t = useTranslations("Internship.invite_participate");

  return (
    <section className={styles.roleSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("title")}</h2>
        <div className={styles.content}>
          {items.map((item) => (
            <RoleCard
              key={createKey()}
              title={item.title}
              imgSrc={item.imgSrc}
              desc1={t(item.desc1)}
              desc2={t(item.desc2)}
            />
          ))}
        </div>
        <ControlBtnRegistrationFormModal type="partaker">
          {t("btn_text")}
        </ControlBtnRegistrationFormModal>
      </div>
    </section>
  );
};

export default RoleSection;
