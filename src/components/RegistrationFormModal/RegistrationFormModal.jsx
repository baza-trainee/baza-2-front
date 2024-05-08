"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RegistrationFormModal.module.scss";
import InputField from "../shared/InputField/InputField";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formScheme } from "./formScheme";
import MainButton from "../shared/MainButton/MainButton";

const RegistrationFormModal = ({ isOpen, onClose }) => {
  const t = useTranslations("Modal_form");
  const modalRef = React.useRef();
  const {
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

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={styles.list}>
            <h2>Реєстрація на участь у проекті Baza Trainee Ukraine</h2>
            <InputField
              id={"firstName"}
              placeholder={t("firstName")}
              registerOptions={register("firstName", {
                ...formScheme.firstName,
              })}
              isError={errors.firstName}
              isValid
              version={"input"}
              label={t("firstName")}
            />
            <InputField
              id={"lastName"}
              placeholder={t("lastName")}
              registerOptions={register("lastName", { ...formScheme.lastName })}
              isError={errors.lastName}
              isValid
              version={"input"}
              label={t("lastName")}
            />
            <InputField
              id={"email"}
              placeholder={"email@gmail.com"}
              registerOptions={register("email", { ...formScheme.email })}
              isError={errors.email}
              isValid
              version={"input"}
              label={t("email")}
            />
            <InputField
              id={"discord"}
              placeholder={t("discord")}
              registerOptions={register("discord", { ...formScheme.discord })}
              isError={errors.discord}
              isValid
              version={"input"}
              label={t("discord")}
            />
            <InputField
              id={"linkedin"}
              placeholder={t("linkedin_placeholder")}
              registerOptions={register("linkedin", { ...formScheme.linkedin })}
              isError={errors.linkedin}
              isValid
              version={"input"}
              label={t("linkedin")}
            />
            <MainButton
              type="submit"
              disabled={isDirty && !isValid}
              className={styles.submit}
            >
              {t("btn_send")}
            </MainButton>
          </ul>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RegistrationFormModal;
