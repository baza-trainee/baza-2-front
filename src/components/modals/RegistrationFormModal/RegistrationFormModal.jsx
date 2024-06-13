"use client";
// import React, { useState } from "react";
import styles from "./RegistrationFormModal.module.scss";
// import clsx from "clsx";
// import { useForm } from "react-hook-form";
 import { useTranslations } from "next-intl";
// import { formScheme } from "./FormMentor/formScheme";
import stateRegistrationFormModal from "@/src/state/stateRegistrationFormModal";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";


import CloseBtn from "../../shared/CloseBtn/CloseBtn";
// import MainButton from "../../shared/MainButton/MainButton";
// import InputField from "../../shared/InputField/InputField";
import LayoutModal from "../LayoutModal/LayoutModal";
// import { Icon } from "../../shared/Icon/Icon";
import FormMentor from "./FormMentor/FormMentor";

const RegistrationFormModal=({test=false})=>{
  const t = useTranslations("Modal_form");
  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   trigger,
  //   formState: { errors, isValid, isDirty },
  //   reset,
  // } = useForm({ defaultValues: { ...formScheme.defaultValues } });
  
  // Отримуємо стан.
  const isOpen = stateRegistrationFormModal(state => state.isOpen);
  const type = stateRegistrationFormModal(state => state.type);

  const onClose = stateRegistrationFormModal(state => state.close);

  useBodyLock(isOpen);

  if (!isOpen) return null;

  // const onSubmit = (data) => {
  //   console.log(data);
  //   reset();
  // };
  // const optionsSpec = [
  //   { id: "uiuxDesigner", label: "UI/UX Designer" },
  //   { id: "frontend", label: "Frontend" },
  //   { id: "backend", label: "Backend" },
  //   { id: "fullstackEngineer", label: "Fullstack Engineer" },
  //   { id: "qaManualEngineer", label: "QA Manual Engineer" },
  //   { id: "projectManager", label: "Project Manager" },
  // ];

  // const optionsTime = [
  //   { id: "t9001200", label: "9.00-12.00" },
  //   { id: "t12001500", label: "12.00-15.00" },
  //   { id: "t18002100", label: "18.00-21.00" },
  //   { id: "anytime", label: t("anytime") },
  // ];

  // const optionsPersonalData = [{ id: "personaldata", label: t("permit") }];

  // const inputFields = [
  //   {
  //     id: "firstName",
  //     placeholder: t("firstName"),
  //     registerOptions: register("firstName", { ...formScheme.firstName, onBlur:() => {
  //       trigger("firstName")
  //     } }),
  //     isError: !!errors.firstName,
  //     version: "input",
  //     label: t("firstName"),
  //   },
  //   {
  //     id: "lastName",
  //     placeholder: t("lastName"),
  //     registerOptions: register("lastName", { ...formScheme.lastName, onBlur:() => {
  //       trigger("lastName")
  //     } }),
  //     isError: !!errors.lastName,
  //     version: "input",
  //     label: t("lastName"),
  //   },
  //   {
  //     version: "checkBox",
  //     id: "specialization",
  //     options: optionsSpec,
  //     control,
  //     label: t("specialization"),
  //   },
  //   {
  //     id: "email",
  //     placeholder: "email@gmail.com",
  //     registerOptions: register("email", { ...formScheme.email, onBlur:() => {
  //       trigger("email")
  //     } }),
  //     isError: !!errors.email,
  //     version: "input",
  //     label: t("email"),
  //   },
  //   {
  //     id: "phone",
  //     placeholder: "+380 xxx xxx xxx",
  //     registerOptions: register("phone", { ...formScheme.phone, onBlur:() => {
  //       trigger("phone")
  //     } }),
  //     isError: !!errors.phone,
  //     version: "input",
  //     label: t("phone"),
  //   },
  //   {
  //     id: "discord",
  //     placeholder: t("discord"),
  //     registerOptions: register("discord", { ...formScheme.discord, onBlur:() => {
  //       trigger("discord")
  //     } }),
  //     isError: !!errors.discord,
  //     version: "input",
  //     label: t("discord"),
  //   },
  //   {
  //     id: "linkedin",
  //     placeholder: t("linkedin_placeholder"),
  //     registerOptions: register("linkedin", { ...formScheme.linkedin, onBlur:() => {
  //       trigger("linkedin")
  //     } }),
  //     isError: !!errors.linkedin,
  //     version: "input",
  //     label: t("linkedin"),
  //   },
  //   {
  //     version: "checkBox",
  //     id: "convenient_time",
  //     options: optionsTime,
  //     control,
  //     label: t("convenient_time"),
  //   },
  //   {
  //     version: "checkBox",
  //     id: "agree",
  //     options: optionsPersonalData,
  //     control,
  //     label: "",
  //   },
  // ];

  return (
    <LayoutModal isOpen handleClose={onClose}>
      <div className={styles.wrapper} onClick={(e) => {
        onClose()
        e.stopPropagation()
        }}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()
        }>
        {/* <h2 className={styles.title}>{t("title_mentor")}</h2> */}
          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>

         {test ? 
            <h1>`Форма Реєстрація {type} -
               Ще на етапі розробки :(`</h1>
             :
             <FormMentor/>
            }
        </div>
      </div>
    </LayoutModal>
  );

};

export default RegistrationFormModal;
