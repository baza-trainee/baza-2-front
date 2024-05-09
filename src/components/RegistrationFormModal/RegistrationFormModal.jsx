"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RegistrationFormModal.module.scss";
import InputField from "../shared/InputField/InputField";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formScheme } from "./formScheme";
import MainButton from "../shared/MainButton/MainButton";
import { Icon } from "../shared/Icon/Icon";

const RegistrationFormModal = ({ isOpen, onClose }) => {
  const t = useTranslations("Modal_form");
  const modalRef = React.useRef();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({ defaultValues: { ...formScheme.defaultValues } });

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  const optionsSpec = [
    { id: "uiuxDesigner", label: "UI/UX Designer" },
    { id: "backend", label: "Backend" },
    { id: "qaManualEngineer", label: "QA Manual Engineer" },
    { id: "frontend", label: "Frontend" },
    { id: "fullstackEngineer", label: "Fullstack Engineer" },
    { id: "projectManager", label: "Project Manager" },
  ];

  const optionsTime = [
    { id: "t9001200", label: "9.00-12.00" },
    { id: "t18002100", label: "18.00-21.00" },
    { id: "t12001500", label: "12.00-15.00" },
    { id: "anytime", label: "anytime" },
  ];

  const optionsPersonalData = [{ id: "personaldata", label: t("agree") }];

  const inputFields = [
    {
      id: "firstName",
      placeholder: t("firstName"),
      registerOptions: register("firstName", { ...formScheme.firstName }),
      isError: !!errors.firstName,
      version: "input",
      label: t("firstName"),
    },
    {
      id: "lastName",
      placeholder: t("lastName"),
      registerOptions: register("lastName", { ...formScheme.lastName }),
      isError: !!errors.lastName,
      version: "input",
      label: t("lastName"),
    },
    {
      version: "checkBox",
      id: "specialization",
      options: optionsSpec,
      control,
      label: t("specialization"),
    },
    {
      id: "email",
      placeholder: "email@gmail.com",
      registerOptions: register("email", { ...formScheme.email }),
      isError: !!errors.email,
      version: "input",
      label: t("email"),
    },
    {
      id: "phone",
      placeholder: "+380 xxx xxx xxx",
      registerOptions: register("phone", { ...formScheme.phone }),
      isError: !!errors.phone,
      version: "input",
      label: t("phone"),
    },
    {
      id: "discord",
      placeholder: t("discord"),
      registerOptions: register("discord", { ...formScheme.discord }),
      isError: !!errors.discord,
      version: "input",
      label: t("discord"),
    },
    {
      id: "linkedin",
      placeholder: t("linkedin_placeholder"),
      registerOptions: register("linkedin", { ...formScheme.linkedin }),
      isError: !!errors.linkedin,
      version: "input",
      label: t("linkedin"),
    },
    {
      version: "checkBox",
      id: "convenient_time",
      options: optionsTime,
      control,
      label: t("convenient_time"),
    },
    {
      version: "checkBox",
      id: "agree",
      options: optionsPersonalData,
      control,
      label: "",
    },
  ];

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <Icon name="close" width={20} height={20} />
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{t("title")}</h2>
          <ul className={styles.list}>
            {inputFields.map((field) => (
              <li key={field.id}>
                <InputField {...field} />
              </li>
            ))}
          </ul>
          <MainButton
            type="submit"
            disabled={!isDirty || !isValid}
            className={styles.submit}
          >
            {t("btn_send")}
          </MainButton>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RegistrationFormModal;
