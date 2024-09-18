"use client";
import React, { useCallback, useEffect, useState } from "react";
import { items } from "./items";
import RoleCard from "./RoleCard/RoleCard";
import ControlBtnRegistrationFormModal from "../../shared/controlButtons/ControlBtnRegistrationFormModal";
import { useTranslations } from "next-intl";
import { createKey } from "@/src/lib/utils/createKey";
import { Pagination } from "swiper/modules";
import Carousel from "../../shared/Carousel/Carousel";
import CarouselPagination from "../../shared/Carousel/CarouselPagination/CarouselPagination";
import clsx from "clsx";
import styles from "./RoleSection.module.scss";

const RoleSection = () => {
  const t = useTranslations("Internship.invite_participate");
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 600);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 600);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

  return (
    <section className={styles.roleSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("title")}</h2>
        {isMobile ? (
          <div className={styles.mobContainer}>
            <Carousel
              items={items}
              modules={[Pagination]}
              paginationEl={".custom-pagination-role"}
              grabCursor
              spaceBetween={30}
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
            <CarouselPagination
              className={clsx("custom-pagination-role", styles.pagination)}
            />
          </div>
        ) : (
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
        )}
      <ControlBtnRegistrationFormModal className={styles.btn} type="partaker">
        {t("btn_text")}
      </ControlBtnRegistrationFormModal>
      </div>
    </section>
  );
};

export default RoleSection;
