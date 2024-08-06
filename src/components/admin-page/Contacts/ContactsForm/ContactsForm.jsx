"use client";

import styles from "./ContactsForm.module.scss";
import { Icon } from "@/src/components/shared/Icon/Icon";
import InputField from "@/src/components/shared/inputs/InputField/InputField";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import { useForm } from "react-hook-form";
import { contactsDefaultValues, ContactsScheme } from "./conctactFormScheme";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";

export default function ContactsForm({ defaultValues, handleMutate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: { ...contactsDefaultValues },
    resolver: zodResolver(ContactsScheme),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const updatedContacts = {
      contactsDataList: {
        phone1: data.phone1,
        phone2: data.phone2,
        email: data.email,
      },
      socialsMediaList: {
        telegram: data.telegram,
        facebook: data.facebook,
        linkedin: data.linkedin,
      },
    };

    console.log("Form data submitted:", updatedContacts);
    handleMutate(updatedContacts);
  };

  useEffect(() => {
    if (defaultValues) {
      console.log("Полученные данные в ContactsForm:", defaultValues);

      reset({
        phone1:
          formatPhoneNumber(String(defaultValues.contactsDataList?.phone1)) ||
          "",
        phone2:
          formatPhoneNumber(String(defaultValues.contactsDataList?.phone2)) ||
          "",
        email: defaultValues.contactsDataList?.email || "",
        telegram: defaultValues.socialsMediaList?.telegram || "",
        facebook: defaultValues.socialsMediaList?.facebook || "",
        linkedin: defaultValues.socialsMediaList?.linkedin || "",
      });
    }
  }, [defaultValues, reset]);

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      console.log("Форма неактивна из-за ошибок:", errors);
      return true;
    } else if (!isDirty) {
      console.log("Форма неактивна, потому что не было изменений.");
      return true;
    } else if (!isValid) {
      console.log("Форма неактивна, потому что данные не валидны.");
      return true;
    } else {
      console.log("Форма активна и доступна для отправки.");
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.input}>
            <InputField
              id="phone1"
              required={false}
              type="textArea"
              placeholder="Введіть телефон"
              version="input_admin"
              label="Телефон"
              isError={errors.phone1}
              isValid={isValid}
              registerOptions={register("phone1", { ...ContactsScheme.phone1 })}
            />
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
            />
          </div>
          <div className={styles.input}>
            <InputField
              id="phone2"
              required={false}
              type="textArea"
              placeholder="Введіть телефон"
              version="input_admin"
              label="Телефон"
              isError={errors.phone2}
              isValid={isValid}
              registerOptions={register("phone2", { ...ContactsScheme.phone2 })}
            />
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
            />
          </div>
          <div className={styles.input}>
            <InputField
              id="email"
              required={false}
              type="textArea"
              placeholder="Введіть електронну пошту"
              version="input_admin"
              label="Email"
              isError={errors.email}
              isValid={isValid}
              registerOptions={register("email", { ...ContactsScheme.email })}
            />
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <InputField
              id="telegram"
              required={false}
              type="textArea"
              placeholder="Додайте посилання"
              version="input_admin"
              label="Telegram"
              isError={errors.telegram}
              isValid={isValid}
              registerOptions={register("telegram", {
                ...ContactsScheme.telegram,
              })}
            />
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
            />
          </div>
          <div className={styles.input}>
            <InputField
              id="facebook"
              required={false}
              type="textArea"
              placeholder="Додайте посилання"
              version="input_admin"
              label="Facebook"
              isError={errors.facebook}
              isValid={isValid}
              registerOptions={register("facebook", {
                ...ContactsScheme.facebook,
              })}
            />
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
            />
          </div>
          <div className={styles.input}>
            <InputField
              id="linkedin"
              required={false}
              type="textArea"
              placeholder="Додайте посилання"
              version="input_admin"
              label="Linkedin"
              isError={errors.linkedin}
              isValid={isValid}
              registerOptions={register("linkedin", {
                ...ContactsScheme.linkedin,
              })}
            />
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
            />
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <MainButton type="submit" disabled={isDisabled()}>
          {"Зберегти зміни"}
        </MainButton>

        <MainButton
          variant="admin"
          className={styles.btn_cancel}
          onClick={() => {
            reset();
          }}
        >
          {"Скасувати"}
        </MainButton>
      </div>
    </form>
  );
}
