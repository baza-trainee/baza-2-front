"use client";
import React, { useState } from "react";
import styles from './FormPartaker.module.scss';
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formScheme } from "./formPartakeScheme";
import MainButton from "../../../shared/MainButton/MainButton";
import InputField from "../../../shared/InputField/InputField";
import { optionsSpec, optionsTime } from "./options";
import { Icon } from "@/src/components/shared/Icon/Icon";


export default function FormPartaker() {
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
  //const [ convenientTime, setConvenientTime ] = useState('');
  const [ agree, setAgree ] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_partaker}>
      <h2>{t("title")}</h2>

      <ul className={styles.list}>
        <li>
          <InputField
            id={"firstName"}
            className={styles.item}
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
            className={styles.item}
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
        
            {errors.specialization && <span className={clsx(styles.error,styles._list, styles._hide)}>{t("error_message.specialization")}</span>}
          </div>
        </li>


        <li>
          <InputField
            id={"phone"}
            className={styles.item}
            placeholder={"+380 xx xxx xx xx"}
            defaultValues={"+380"}
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
            id={"email"}
            className={styles.item}
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
            id={"country"}
            className={styles.item}
            placeholder={t("country_placeholder")}
            registerOptions={register("country", { ...formScheme.country,onBlur:() => {
              trigger("country")
            } })}
            isError={errors.country}
            isValid={isValid}
            version={"input"}
            label={t("country")}
          />
          {errors.country && <span className={clsx(styles.error, styles._hide)}>{t("error_message.country")}</span>}
        </li>
        <li>
          <InputField
            id={"city"}
            className={styles.item}
            placeholder={t("city_placeholder")}
            registerOptions={register("city", { ...formScheme.city,onBlur:() => {
              trigger("city")
            } })}
            isError={errors.city}
            isValid={isValid}
            version={"input"}
            label={t("city")}
          />
          {errors.city && <span className={clsx(styles.error, styles._hide)}>{t("error_message.city")}</span>}
        </li>

        <li>
          <InputField
            id={"discord"}
            className={styles.item}
            placeholder={t("discord")}
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
            className={styles.item}
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

        {/* <li>
          <div className={styles.item}>
            <h4>{t("convenient_time")} <span>*</span></h4>
            <div className={styles.select}>
              {optionsTime.map((option)=>{
                return(
                  <label htmlFor={option.id} className={clsx(styles.btn_option,styles[option.id])} key={option.id}>
                  <input
                  type="radio" 
                  {...register("convenient_time", { ...formScheme.convenient_time })}
                  id={option.id} 
                  name="convenient_time" 
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
            
            {errors.convenient_time && <span className={clsx(styles.error,styles._list, styles._hide)}>{t("error_message.convenient_time")}</span>}
          </div>

        </li> */}
        <li>
          <div className={styles.item}>
            <label
              htmlFor={'agree'}
              className={clsx(styles.btn_option, styles.agree)}
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
            {errors.agree && <span className={clsx(styles.error, styles._list, styles._hide)}>{t("error_message.permit")}</span>}
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