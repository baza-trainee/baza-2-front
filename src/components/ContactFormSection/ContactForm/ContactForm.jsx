"use client";
import styles from "./ContactForm.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from "next-intl";
import { useState } from "react";
import handlerSendContactForm from "@/src/lib/services/handlerSendContactForm";
import { FeedbackSchema, feedbackDefaultValues } from "./FeedbackSchema";
import { Icon } from "../../shared/Icon/Icon";
import MainButton from "../../shared/MainButton/MainButton";
import InputField from "../../shared/InputField/InputField";
import stateErrorAlert from "@/src/state/stateErrorAlert";
import ErrorAlert from "../../shared/ErrorAlert/ErrorAlert";
import Loader from "../../shared/loader/Loader";

export default function ContactForm() {
  const t = useTranslations("Main.feedback_form");
  const isOpen = stateErrorAlert(state => state.isOpen);
  const open = stateErrorAlert(state => state.open);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...feedbackDefaultValues}, resolver: zodResolver(FeedbackSchema), mode: 'onBlur'});

  const [isSubmit, setIsSubmit] = useState(null);
  const [loader, setIsLoader] = useState(false);

  const isError = (res) => {
    setIsLoader(false)
    if(res === 'error'){
      open()
    }
    setIsSubmit(res)
  }

  const onSubmit = (data) => {
    setIsLoader(true)
    handlerSendContactForm( data, isError )
    console.log(data)
    setIsSubmit(null)
    reset();
  };

  const isDisabled = () => {
    if (errors.firstName || errors.email || errors.message) {
      return true;
    } else if (isDirty && !isValid) {
      return true;
    } else return false;
  };

  return (
    <form className={styles.form} 
      onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li>
          <InputField
            id={"firstName"}
            placeholder={t("name")}
            registerOptions={register("firstName", { ...FeedbackSchema.firstName})}
            isError={errors.firstName}
            isValid={isValid}
            version={"input"}
            label={t("name")}
          />

          {errors.firstName && <span className={clsx(styles.error, styles._hide)}>{t(`error_message.${errors.firstName.message}`)}</span>}
        </li>
        <li>
          <InputField
            id={"email"}
            placeholder={"email@gmail.com"}
            registerOptions={register("email", { ...FeedbackSchema.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input"}
            label={t("email")}
          />

          {errors.email && <span className={clsx(styles.error, styles._hide)}>{t(`error_message.${errors.email.message}`)}</span>}
        </li>
        <li>
          <InputField
            id={"message"}
            placeholder={t("message_placeholder")}
            registerOptions={register("message", { ...FeedbackSchema.message })}
            isError={errors.message}
            isValid={isValid}
            version={"textArea"}
            label={t("message")}
          />
          
          {errors.message && <span className={styles.error}>{t(`error_message.${errors.message.message}`)}</span>}
        </li>
      </ul>
      
      <MainButton type="submit" disabled={isDisabled()} >
        {t("btn_send")}
      </MainButton>
      
     {isSubmit === 'ok' && <div className={styles.send}>
        <Icon name='mail'/>
      </div>}
      
      {isOpen && <ErrorAlert/>}

      {loader && <Loader/>}
    </form>
  );
}