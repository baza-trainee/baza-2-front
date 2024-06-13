"use client";
import React, { useState } from "react";
import styles from './FormMentor.module.scss';
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formScheme } from "./formScheme";
import MainButton from "../../../shared/MainButton/MainButton";
import InputField from "../../../shared/InputField/InputField";
import { optionsSpec, optionsTime } from "./options";
import { Icon } from "@/src/components/shared/Icon/Icon";


export default function FormMentor() {
  const t = useTranslations("Modal_form");
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({ defaultValues: { ...formScheme.defaultValues } });
  const [ specialization, setSpecialization ] = useState('');
  const [ convenientTime, setConvenientTime ] = useState('');
  const [ agree, setAgree ] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  //const optionsPersonalData = [{ id: "personaldata", label: t("permit") }];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                  <label htmlFor={option.id} className={styles.btn_option} key={option.id}>
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
                  <label htmlFor={option.id} className={styles.btn_option} key={option.id}>
                  <input
                  type="radio" 
                  {...register("convenient_time", { ...formScheme.convenient_time })}
                  id={option.id} name="convenient_time" 
                  value={option.label} 
                  onClick={()=>{setConvenientTime(option.label)}}/>
                    <span className={clsx(styles.check, convenientTime === option.label && styles._active)}>
                      <Icon name={'check'}/>
                    </span>
                    {option.label=== "anytime"? t("anytime"):option.label}
                  </label>
                )
              })}
            </div>
            
            {errors.convenient_time && <span className={clsx(styles.error, styles._hide)}>{t("error_message.convenient_time")}</span>}
          </div>

        </li>
        <li>
          <div className={styles.item}>
            <label
              htmlFor={'agree'}
              className={styles.btn_option}
            >
              <input
                id={'agree'}
                type="checkbox"
                {...register("agree", { ...formScheme.agree })}
                onClick={(e)=>{setAgree(e.target.checked)}}
              ></input>
              <span className={clsx(styles.check, agree && styles._active)}>
                <Icon name={'check'}/>
                </span>

              { t("permit")}
            </label>
            {errors.agree && <span className={clsx(styles.error, styles._hide)}>{t("error_message.agree")}</span>}
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
    </form>
  )
}