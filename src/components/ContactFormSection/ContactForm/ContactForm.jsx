"use client";
import styles from "./ContactForm.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { ContactFormService } from "@/src/api/contact-form";
import { FeedbackSchema, feedbackDefaultValues } from "./formFeedbackSchema";
import { Icon } from "../../shared/Icon/Icon";
import MainButton from "../../shared/MainButton/MainButton";
import InputField from "../../shared/InputField/InputField";
import stateUseAlert from "@/src/state/stateUseAlert";
import Loader from "../../shared/loader/Loader";

export default function ContactForm() {
  const t = useTranslations("Main.feedback_form");
  const open = stateUseAlert(state => state.open);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...feedbackDefaultValues}, resolver: zodResolver(FeedbackSchema), mode: 'onBlur'});

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data) => {
      return ContactFormService(data)
    }, 
    onError: () => {
      open('error')
    },
  })

  const onSubmit = (data) => {
    mutate(data)
    console.log(data)
    reset();
  };

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
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
            maxLength={35}
            placeholder={t("name")}
            registerOptions={register("firstName", { ...FeedbackSchema.firstName})}
            isError={errors.firstName}
            isValid={isValid}
            version={"input"}
            label={t("name")}
          />

          {errors.firstName && <p className={clsx(styles.error, styles._hide)}>{t(`error_message.${errors.firstName.message}`)}</p>}
        </li>
        <li>
          <InputField
            id={"email"}
            maxLength={55}
            placeholder={"email@gmail.com"}
            type='email'
            registerOptions={register("email", { ...FeedbackSchema.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input"}
            label={t("email")}
          />

          {errors.email && <p className={clsx(styles.error, styles._hide)}>{t(`error_message.${errors.email.message}`)}</p>}
        </li>
        <li>
          <InputField
            id={"message"}
            maxLength={305}
            placeholder={t("message_placeholder")}
            registerOptions={register("message", { ...FeedbackSchema.message })}
            isError={errors.message}
            isValid={isValid}
            version={"textArea"}
            label={t("message")}
          />
          
          {errors.message && <p className={styles.error}>{t(`error_message.${errors.message.message}`)}</p>}
        </li>
      </ul>
      
      <MainButton type="submit" disabled={isDisabled()} >
        {t("btn_send")}
      </MainButton>
      
     {isSuccess && <div className={styles.send}>
        <Icon name='mail'/>
      </div>}

      {isPending && <Loader/>}
    </form>
  );
}