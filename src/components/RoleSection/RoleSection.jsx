"use client";
import React from "react";
import { items } from "./items";
import RoleCard from "../shared/RoleCard/RoleCard";
import ControlBtnRegistrationFormModal from "../shared/controlButtons/ControlBtnRegistrationFormModal";
import { useTranslations } from "next-intl";
import { createKey } from "@/src/lib/utils/createKey";
import styles from "./RoleSection.module.scss";
import Carousel from "../shared/Carousel/Carousel";
//import { Navigation, Pagination, Autoplay } from "swiper/modules";

const RoleSection = () => {
  const t = useTranslations("Internship.invite_participate");

  return (
    <section className={styles.roleSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("title")}</h2>

        {/* слайдер на мобільному */}
        <div className={styles.mobile_content}>
        <Carousel
        //modules={[Navigation, Pagination, Autoplay]}
        //paginationEl={".custom-pagination-hero"}
        items={items}
        spaceBetween={10}
        // delay={10000}
        // breakpoints={{
        //   992: {
        //     sped:100,
        //   },
        // }}
        renderItem={(item) => (
          <RoleCard
          key={createKey()}
          title={item.title}
          imgSrc={item.imgSrc}
          desc1={t(item.desc1)}
          desc2={t(item.desc2)}
        />
        )}
      />
        {/* грід все інше */}
        </div>
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
