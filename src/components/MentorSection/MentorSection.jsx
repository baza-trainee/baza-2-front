//"use client";
import Image from "next/image";
import img from "./Images/image.jpg"
//import MainButton from "../shared/MainButton/MainButton";
import { useTranslations } from "next-intl";

import styles from "./MentorSection.module.scss";
import ControlButton from "./ControlButton";
//import useStateModal from "@/src/state/useStateModal";

const MentorSection = () => {
  const t = useTranslations("Main.mentor_section");
  //const open = useStateModal((state) => state.open)
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
        <ControlButton>{t("btn_mentor")}</ControlButton>
        {/* <MainButton onClick={open}>{t("btn_mentor")}</MainButton> */}
      </div>
    </section>
  );
};

export default MentorSection;
