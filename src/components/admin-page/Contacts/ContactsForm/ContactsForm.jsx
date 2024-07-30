import InputField from "@/src/components/shared/InputField/InputField";
import styles from "./ContactsForm.module.scss";

export default function ContactsForm() {
  return (
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
          />
        </div>
      </div>
    </div>
  );
}
