"use client";
import styles from "./ContactForm.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formScheme } from "./formScheme";
import MainButton from "../../shared/MainButton/MainButton";
import InputField from "../../shared/InputField/InputField";
import { Icon } from "../../shared/Icon/Icon";

export default function ContactForm() {
  const t = useTranslations("Main.feedback_form");
  
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isDirty, isSubmitSuccessful },
    reset
  } = useForm({ defaultValues: { ...formScheme.defaultValues } });

  const onSubmit = (data) => {
    console.log(data);
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
            registerOptions={register("firstName", { ...formScheme.firstName, onBlur:() => {
              trigger("firstName")
            }})}
            isError={errors.firstName}
            isValid={isValid}
            version={"input"}
            label={t("name")}
           
          />
          {errors.firstName && <span className={clsx(styles.error, styles._hide)}>{t("error_message.name")}</span>}
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
            id={"message"}
            placeholder={t("message_placeholder")}
            registerOptions={register("message", { ...formScheme.message,onBlur:() => {
              trigger("message")
            } })}
            isError={errors.message}
            isValid={isValid}
            version={"textArea"}
            label={t("message")}
          />
          {errors.message && <span className={styles.error}>{t("error_message.message")}</span>}
        </li>
      </ul>
      
      <MainButton type="submit" disabled={isDisabled()} >
        {t("btn_send")}
      </MainButton>
      
     {isSubmitSuccessful && <div className={styles.send}>
        <Icon name='mail'/>
      </div>}
    </form>
  );
}
