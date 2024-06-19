"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './FormMentor.module.scss';
import clsx from "clsx";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { MentorSchema, mentorDefaultValues } from "./formMentorScheme";
import MainButton from "../../../shared/MainButton/MainButton";
import InputField from "../../../shared/InputField/InputField";
import { optionsSpec, optionsTime } from "./options";
import { Icon } from "@/src/components/shared/Icon/Icon";
import Loader from "@/src/components/shared/loader/Loader";
import stateUseAlert from "@/src/state/stateUseAlert";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";
import { createKey } from "@/src/lib/utils/createKey";

export default function FormMentor({handleClose}) {
  const t = useTranslations("Modal_form");

  const open = stateUseAlert(state => state.open);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...mentorDefaultValues}, resolver: zodResolver(MentorSchema), mode: 'onBlur'});

  const [ specialization, setSpecialization ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ convenientTime, setConvenientTime ] = useState('');
  const [ agree, setAgree ] = useState(false);
  const [loader, setIsLoader] = useState(false);

  const resetForm = () => {
    setSpecialization('')
    setPhone('')
    setConvenientTime('')
    setAgree(false)
    setIsLoader(false)
    reset();
    handleClose()
  }
  const isSubmitted = (res) => {
    setIsLoader(false)
    if(res === 'error'){
      open('error')
    }
    open('success')
    resetForm()
  }

  const onSubmit = (data) => {
    setIsLoader(true)
    // Імітація відправки форми
    setTimeout(()=>{
      isSubmitted('success')
      console.log(data);
    },3000)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_mtntor}>
      <h2>{t("title_mentor")}</h2>

      <ul className={styles.list}>
        <li>
          <InputField
            id={"firstName"}
            className={styles.item}
            placeholder={t("firstName")}
            registerOptions={register("firstName", { ...MentorSchema.firstName})}
            isError={errors.firstName}
            isValid={isValid}
            version={"input"}
            label={t("firstName")}
          />

          {errors.firstName && <p className={styles.error_modal}>{t(`error_message.${errors.firstName.message}`)}</p>}
        </li>

        <li>
          <InputField
            id={"lastName"}
            className={styles.item}
            placeholder={t("lastName")}
            registerOptions={register("lastName", { ...MentorSchema.lastName})}
            isError={errors.lastName}
            isValid={isValid}
            version={"input"}
            label={t("lastName")}
          />

          {errors.lastName && <p className={styles.error_modal}>{t(`error_message.${errors.lastName.message}`)}</p>}
        </li>

        <li>
          <div className={styles.item}>
            <h4>{t("specialization")} <span>*</span></h4>
            <div className={styles.select}>
              {optionsSpec.map((option)=>{
                return(
                  <label htmlFor={option.id} className={styles.btn_option} key={createKey()}>
                  <input 
                  type="radio" 
                  {...register("specialization", { ...MentorSchema.specialization })}
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
        
            {errors.specialization && <p className={styles.error_modal}>{t(`error_message.${errors.specialization.message}`)}</p>}
          </div>
        </li>

        <li>
          <InputField
            id={"email"}
            className={styles.item}
            placeholder={"email@gmail.com"}
            registerOptions={register("email", { ...MentorSchema.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input"}
            label={t("email")}
          />
          {errors.email && <p className={styles.error_modal}>{t(`error_message.${errors.email.message}`)}</p>}
        </li>

        <li>
          <InputField
            id={"phone"}
            className={styles.item}
            placeholder={"+380 xx xxx xx xx"}
            value={phone}
            onFocus={()=>{setPhone(phone ? phone : '+380')}}
            onInput={(e)=>{setPhone(e.target.value)}}
            onChange={(e)=>{setPhone(formatPhoneNumber(e.target.value))}}
            registerOptions={register("phone", { ...MentorSchema.phone })}
            isError={errors.phone}
            isValid={isValid}
            version={"input"}
            label={t("phone")}
          />
          {errors.phone && <p className={styles.error_modal}>{t(`error_message.${errors.phone.message}`)}</p>}
        </li>

        <li>
          <InputField
            id={"discord"}
            className={styles.item}
            placeholder={t("discord")}
            registerOptions={register("discord", { ...MentorSchema.discord })}
            isError={errors.discord}
            isValid={isValid}
            version={"input"}
            label={t("discord")}
          />
          {errors.discord && <p className={styles.error_modal}>{t(`error_message.${errors.discord.message}`)}</p>}
        </li>

        <li>
          <InputField
            id={"linkedin"}
            className={styles.item}
            placeholder={t("linkedin_placeholder")}
            registerOptions={register("linkedin", { ...MentorSchema.linkedin })}
            isError={errors.linkedin}
            isValid={isValid}
            version={"input"}
            label={t("linkedin")}
          />
          {errors.linkedin && <p className={styles.error_modal}>{t(`error_message.${errors.linkedin.message}`)}</p>}
        </li>

        <li>
          <div className={styles.item}>
            <h4>{t("convenient_time")} <span>*</span></h4>
            <div className={styles.select}>
              {optionsTime.map((option)=>{
                return(
                  <label htmlFor={option.id} className={clsx(styles.btn_option,styles[option.id])} key={createKey()}>
                  <input
                  type="radio" 
                  {...register("convenient_time", { ...MentorSchema.convenient_time })}
                  id={option.id} 
                  name="convenient_time" 
                  value={option.label=== "anytime"? t("anytime"):option.label} 
                  onClick={()=>{setConvenientTime(option.label)}}/>
                    <span className={clsx(styles.check, convenientTime === option.label && styles._active)}>
                      <Icon name={'check'}/>
                    </span>
                    {option.label=== "anytime"? t("anytime"):option.label}
                  </label>
                )
              })}
            </div>
            
            {errors.convenient_time && <p className={styles.error_modal}>{t("error_message.convenient_time")}</p>}
          </div>
        </li>

        <li>
          <div className={styles.item}>
            <label
              htmlFor={'agree'}
              className={clsx(styles.btn_option, styles.agree)}
            >
              <input
                id={'agree'}
                type="checkbox"
                {...register("agree", { ...MentorSchema.agree })}
                checked={agree}
                onClick={(e)=>{setAgree(e.target.checked)}}
              ></input>
              <span className={clsx(styles.check, agree && styles._active)}>
                <Icon name={'check'}/>
                </span>

              { t("permit")}
            </label>
            {errors.agree && <p className={styles.error_modal}>{t("error_message.permit")}</p>}
          </div>
        </li>
      </ul>

      <MainButton
        type="submit"
        //disabled={!isDirty || !isValid}
        className={styles.submit}
        //variant={"modal"}
      >
        {t("btn_send")}
      </MainButton>

      {loader && <Loader/>}
    </form>
  )
}