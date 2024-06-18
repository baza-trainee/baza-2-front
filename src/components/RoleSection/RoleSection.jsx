import React from "react";
import { items } from "./items";
import RoleCard from "../shared/RoleCard/RoleCard";
import ControlBtnRegistrationFormModal from "../shared/controlButtons/ControlBtnRegistrationFormModal";
import styles from "./RoleSection.module.scss";

const RoleSection = () => {
  return (
    <section className={styles.roleSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Запрошуємо до участі</h2>
        <div className={styles.content}>
          {items.map((item) => (
            <RoleCard {...item} />
          ))}
        </div>
        <ControlBtnRegistrationFormModal type="partaker">
          Приєднатися до спільноти
        </ControlBtnRegistrationFormModal>
      </div>
    </section>
  );
};

export default RoleSection;
