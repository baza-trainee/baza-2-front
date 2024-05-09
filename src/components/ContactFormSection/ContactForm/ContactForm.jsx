"use client";
import styles from "./ContactForm.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl";
import{ formScheme }from './formScheme';
import MainButton from "../../shared/MainButton/MainButton";

export default function ContactForm() {
  const t = useTranslations("Main.feedback_form");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty},
    reset
  } = useForm({ defaultValues: {...formScheme.defaultValues} });

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }
  const isDisabled =()=>{
    if(errors.firstName||errors.email||errors.message ){
      return true
    }else if(isDirty && !isValid){
      return true
    }else return false
  }
  console.log(errors.firstName)
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>

        <li className={styles.item}>
          <label htmlFor="firstName">{t('name')} <span>*</span></label>
          <input id="firstName" 
          className={clsx(errors.firstName && styles._error, isValid && styles._success)}
          {...register('firstName', { ...formScheme.firstName })}
          aria-invalid={errors.firstName ? "true" : "false"} 
           placeholder={t('name')}/>
        </li>

        <li className={styles.item}>
          <label htmlFor="email">{t('email')} <span>*</span></label>
          <input type="email"  
          id="email"
          className={clsx(errors.email && styles._error, isValid && styles._success)}
          {...register('email', { ...formScheme.email })} 
          placeholder={'email@gmail.com'}/>
        </li>    

        <li className={styles.item}>
          <label htmlFor="message">{t('message')} <span>*</span></label>
          <textarea id="message" 
           className={clsx( isValid && styles._success, errors.message &&!isValid && styles._error)}
          {...register('message', {...formScheme.message})}
          placeholder={t('message_placeholder')} />
        </li>  

      </ul>
      <MainButton 
        type="submit" 
        disabled={isDisabled()}
        className={styles.submit}>
          {t("btn_send")}
      </MainButton>
    </form>
  )
}