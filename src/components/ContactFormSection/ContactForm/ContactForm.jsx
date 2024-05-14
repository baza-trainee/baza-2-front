"use client";
import styles from "./ContactForm.module.scss";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { formScheme } from "./formScheme";
import MainButton from "../../shared/MainButton/MainButton";
import InputField from "../../shared/InputField/InputField";
import SendIcon from "./sendIcon/sendIcon";


export default function ContactForm() {
  const t = useTranslations("Main.feedback_form");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitSuccessful },
    reset,
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li>
          <InputField
            id={"firstName"}
            placeholder={t("name")}
            registerOptions={register("firstName", { ...formScheme.firstName })}
            isError={errors.firstName}
            isValid={isValid}
            version={"input"}
            label={t("name")}
          />
        </li>
        <li>
          <InputField
            id={"email"}
            placeholder={"email@gmail.com"}
            registerOptions={register("email", { ...formScheme.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input"}
            label={t("email")}
          />
        </li>
        <li>
          <InputField
            id={"message"}
            placeholder={t("message_placeholder")}
            registerOptions={register("message", { ...formScheme.message })}
            isError={errors.message}
            isValid={isValid}
            version={"textArea"}
            label={t("message")}
          />
        </li>
      </ul>
      <MainButton type="submit" disabled={isDisabled()}>
        {t("btn_send")}
      </MainButton>

     {isSubmitSuccessful && <div className={styles.send}>
        <SendIcon/>
      </div>}
    </form>
  );
}
