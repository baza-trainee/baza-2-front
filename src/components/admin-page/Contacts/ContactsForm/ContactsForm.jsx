import { useEffect } from "react";
import styles from "./ContactsForm.module.scss";
import { Icon } from "@/src/components/shared/Icon/Icon";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";
import InputField from "@/src/components/shared/inputs/InputField/InputField";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import { useForm } from "react-hook-form";
import { contactsDefaultValues, contactsScheme } from "./conctactFormScheme";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ContactsForm({ defaultValues, handleMutate }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: { ...contactsDefaultValues },
    resolver: zodResolver(contactsScheme),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    handleMutate({ contactsData: data.contactsData });
  };

  useEffect(() => {
    if (defaultValues) {
      setValue(
        "phone1",
        formatPhoneNumber(String(defaultValues.contactsDataList?.phone1) || "")
      );
      setValue(
        "phone2",
        formatPhoneNumber(String(defaultValues.contactsDataList?.phone1) || "")
      );
      setValue("email", defaultValues.contactsDataList?.email || "");
      setValue("telegram", defaultValues.socialsMediaList?.telegram || "");
      setValue("facebook", defaultValues.socialsMediaList?.facebook || "");
      setValue("linkedin", defaultValues.socialsMediaList?.linkedin || "");
    }
  }, [defaultValues]);

  const isDisabled = () => {
    console.log("Errors:", errors);
    console.log("Is Dirty:", isDirty);
    console.log("Is Valid:", isValid);
    if (Object.keys(errors).length > 0) {
      return true;
    } else if (!isDirty) {
      return true;
    } else if (!isValid) {
      return true;
    } else return false;
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
              registerOptions={register("phone1", { ...contactsScheme.phone1 })}
              version="input_admin"
              label="Телефон"
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
              registerOptions={register("phone2", { ...contactsScheme.phone2 })}
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
              registerOptions={register("email", { ...contactsScheme.email })}
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
              registerOptions={register("telegram", {
                ...contactsScheme.telegram,
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
              registerOptions={register("facebook", {
                ...contactsScheme.facebook,
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
              registerOptions={register("linkedin", {
                ...contactsScheme.linkedin,
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
          onClick={reset}
        >
          {"Скасувати"}
        </MainButton>
      </div>
    </form>
  );
}
