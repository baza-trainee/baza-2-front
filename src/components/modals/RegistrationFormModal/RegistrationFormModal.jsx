"use client";
import React, { useState } from "react";
import styles from "./RegistrationFormModal.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formScheme } from "./formScheme";
import stateRegistrationFormModal from "@/src/state/stateRegistrationFormModal";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";

import CloseBtn from "../../shared/CloseBtn/CloseBtn";
import MainButton from "../../shared/MainButton/MainButton";
import InputField from "../../shared/InputField/InputField";
import LayoutModal from "../LayoutModal/LayoutModal";
import { Icon } from "../../shared/Icon/Icon";

const RegistrationFormModal=({test=false})=>{
  const t = useTranslations("Modal_form");
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({ defaultValues: { ...formScheme.defaultValues } });
  
  // Отримуємо стан.
  const isOpen = stateRegistrationFormModal(state => state.isOpen);
  const onClose = stateRegistrationFormModal(state => state.close);

  const [ specialization, setSpecialization ] = useState('')
  const [ convenientTime, setConvenientTime ] = useState('')

  useBodyLock(isOpen);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  const optionsSpec = [
    { id: "uiuxDesigner", label: "UI/UX Designer" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstackEngineer", label: "Fullstack Engineer" },
    { id: "qaManualEngineer", label: "QA Manual Engineer" },
    { id: "projectManager", label: "Project Manager" },
  ];

  const optionsTime = [
    { id: "t9001200", label: "9.00-12.00" },
    { id: "t12001500", label: "12.00-15.00" },
    { id: "t18002100", label: "18.00-21.00" },
    { id: "anytime", label: t("anytime") },
  ];

  const optionsPersonalData = [{ id: "personaldata", label: t("permit") }];

  const inputFields = [
    {
      id: "firstName",
      placeholder: t("firstName"),
      registerOptions: register("firstName", { ...formScheme.firstName, onBlur:() => {
        trigger("firstName")
      } }),
      isError: !!errors.firstName,
      version: "input",
      label: t("firstName"),
    },
    {
      id: "lastName",
      placeholder: t("lastName"),
      registerOptions: register("lastName", { ...formScheme.lastName, onBlur:() => {
        trigger("lastName")
      } }),
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
      registerOptions: register("email", { ...formScheme.email, onBlur:() => {
        trigger("email")
      } }),
      isError: !!errors.email,
      version: "input",
      label: t("email"),
    },
    {
      id: "phone",
      placeholder: "+380 xxx xxx xxx",
      registerOptions: register("phone", { ...formScheme.phone, onBlur:() => {
        trigger("phone")
      } }),
      isError: !!errors.phone,
      version: "input",
      label: t("phone"),
    },
    {
      id: "discord",
      placeholder: t("discord"),
      registerOptions: register("discord", { ...formScheme.discord, onBlur:() => {
        trigger("discord")
      } }),
      isError: !!errors.discord,
      version: "input",
      label: t("discord"),
    },
    {
      id: "linkedin",
      placeholder: t("linkedin_placeholder"),
      registerOptions: register("linkedin", { ...formScheme.linkedin, onBlur:() => {
        trigger("linkedin")
      } }),
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

  return (
    <LayoutModal isOpen handleClose={onClose}>
      <div className={styles.wrapper} onClick={(e) => {
        onClose()
        e.stopPropagation()
        }}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()
        }>

          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>

         {test ? 
            <h1>Форма Реєстрація -
               Ще на етапі розробки :(</h1>
             :
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{t("title_mentor")}</h2>

            <ul className={styles.list}>
              <li>
                <InputField
                  id={"firstName"}
                  placeholder={t("firstName")}
                  registerOptions={register("firstName", { ...formScheme.firstName, onBlur:() => {
                    trigger("firstName")
                  }})}
                  isError={errors.firstName}
                  isValid={isValid}
                  version={"input"}
                  label={t("firstName")}
                />

                {errors.firstName && <span className={clsx(styles.error, styles._hide)}>{t("error_message.firstName")}</span>}
              </li>

              <li>
                <InputField
                  id={"lastName"}
                  placeholder={t("lastName")}
                  registerOptions={register("lastName", { ...formScheme.lastName, onBlur:() => {
                    trigger("lastName")
                  }})}
                  isError={errors.firstName}
                  isValid={isValid}
                  version={"input"}
                  label={t("lastName")}
                />

                {errors.lastName && <span className={clsx(styles.error, styles._hide)}>{t("error_message.lastName")}</span>}
              </li>

              <li>
                <div className={styles.item}>
                  <h4>{t("specialization")} <span>*</span></h4>
                  <div className={styles.select}>
                    {optionsSpec.map((option)=>{
                      return(
                        <label for={option.id} className={styles.btn_option} key={option.id}>
                        <input 
                        type="radio" 
                        {...register("specialization", { ...formScheme.specialization })}
                        id={option.id} name="specialization" 
                        value={option.label} 
                        onClick={()=>{setSpecialization(option.label)}}/>
                          <span className={clsx(styles.check,specialization === option.label && styles._active)}>
                            <Icon name={'check'}/>
                          </span>
                          {option.label}
                        </label>
                      )
                    })}
                  </div>
                  
                  {errors.specialization && <span className={clsx(styles.error, styles._hide)}>{t("error_message.specialization")}</span>}
                </div>

                {/* <InputField {...{version: "checkBox",
                    id: "specialization",
                    options: optionsSpec,
                    control,
                    label: t("specialization")}}
                  // id={'specialization'}
                  // placeholder={t("specialization")}
                  // registerOptions={register("firstName", { ...formScheme.lastName, onBlur:() => {
                  //   trigger("lastName")
                  // }})}
                  // isError={errors.firstName}
                  // isValid={isValid}
                  // version={"checkBox"}
                  // label={t("specialization")}
                />

                {errors.lastName && <span className={clsx(styles.error, styles._hide)}>{t("error_message.lastName")}</span>} */}
              </li>

              <li>
                <InputField
                  id={"email"}
                  placeholder={"email@gmail.com"}
                  registerOptions={register("email", { ...formScheme.email,onBlur:() => {
                    trigger("email")
                  } })}
                  isError={errors.email}
                  isValid={isValid}
                  version={"input"}
                  label={t("email")}
                />
                {errors.email && <span className={clsx(styles.error, styles._hide)}>{t("error_message.email")}</span>}
              </li>
              <li>
                <InputField
                  id={"phone"}
                  placeholder={"+380 xx xxx xx xx"}
                  registerOptions={register("phone", { ...formScheme.phone,onBlur:() => {
                    trigger("phone")
                  } })}
                  isError={errors.phone}
                  isValid={isValid}
                  version={"input"}
                  label={t("phone")}
                />
                {errors.phone && <span className={clsx(styles.error, styles._hide)}>{t("error_message.phone")}</span>}
              </li>
              <li>
                <InputField
                  id={"discord"}
                  placeholder={"+380 xx xxx xx xx"}
                  registerOptions={register("discord", { ...formScheme.discord,onBlur:() => {
                    trigger("discord")
                  } })}
                  isError={errors.discord}
                  isValid={isValid}
                  version={"input"}
                  label={t("discord")}
                />
                {errors.discord && <span className={clsx(styles.error, styles._hide)}>{t("error_message.discord")}</span>}
              </li>
              <li>
                <InputField
                  id={"linkedin"}
                  placeholder={t("linkedin_placeholder")}
                  registerOptions={register("linkedin", { ...formScheme.linkedin, onBlur:() => {
                    trigger("linkedin")
                  } })}
                  isError={errors.linkedin}
                  isValid={isValid}
                  version={"input"}
                  label={t("linkedin")}
                />
                {errors.linkedin && <span className={clsx(styles.error, styles._hide)}>{t("error_message.linkedin")}</span>}
              </li>

              <li>
                <div className={styles.item}>
                  <h4>{t("convenient_time")} <span>*</span></h4>
                  <div className={styles.select}>
                    {optionsTime.map((option)=>{
                      return(
                        <label for={option.id} className={styles.btn_option} key={option.id}>
                        <input 
                        type="radio" 
                        {...register("convenient_time", { ...formScheme.convenient_time })}
                        id={option.id} name="convenient_time" 
                        value={option.label} 
                        onClick={()=>{setConvenientTime(option.label)}}/>
                          <span className={clsx(styles.check, convenientTime === option.label && styles._active)}>
                            <Icon name={'check'}/>
                          </span>
                          {option.label}
                        </label>
                      )
                    })}
                  </div>
                  
                  {errors.convenient_time && <span className={clsx(styles.error, styles._hide)}>{t("error_message.convenient_time")}</span>}
                </div>

              </li>
                {/* {inputFields.map((field) => (
                  <div key={field.id}>
                    <InputField {...field} />
                    {field.isError && <p>{t(`error_message.${field.id}`)}</p>}
                  </div>
                ))} */}
            </ul>

            <MainButton
              type="submit"
             // disabled={!isDirty || !isValid}
              className={styles.submit}
              //variant={"modal"}
            >
              {t("btn_send")}
            </MainButton>
          </form>}
        </div>
      </div>
    </LayoutModal>
  );

};

export default RegistrationFormModal;
