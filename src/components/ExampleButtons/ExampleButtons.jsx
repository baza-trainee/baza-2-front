"use client";
import styles from "./exampleButtons.module.scss";
import { useState } from "react";
import MainButton from "../shared/MainButton/MainButton";
import { useTranslations } from "next-intl";
// !!! Видалити після тестування
export default function ExampleButtons() {
  const [res1, setRes1] = useState(false);
  const t = useTranslations("Main");
  const b = useTranslations("Header");
  const d = useTranslations("Modal");
  //const t = useTranslations('Index');
  return (
    <ul className={styles.list}>
      <li>
        <MainButton
          onClick={() => {
            setRes1(!res1);
          }}
        >
          {b("btn_support_project")}
        </MainButton>
        <h3>{res1 ? "open" : "cloced"}</h3>
      </li>
      <li>
        <MainButton>{t("mentor_section.btn_mentor")}</MainButton>
      </li>
      <li>
        <MainButton variant="modal">+ {d('another_amount')}</MainButton>
      </li>
      <li>
        <MainButton type="submit" ariaLabel={"Відправити"}>
          {t("feedback_form.btn_send")}
        </MainButton>
        <h3>type submit</h3>
      </li>
      <li>
        <MainButton ariaLabel={"Відправити"} disabled={true} type="submit">
          {t("feedback_form.btn_send")}
        </MainButton>
        <h3>disabled</h3>
      </li>
    </ul>
  );
}
