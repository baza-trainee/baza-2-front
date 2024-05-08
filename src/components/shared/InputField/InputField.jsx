import styles from "./InputField.module.scss";
import clsx from "clsx";

export default function InputField({
  id,
  placeholder,
  registerOptions,
  isError,
  isValid,
  version,
  label,
}) {
  if (version === "textArea") {
    return (
      <li className={styles.item}>
        <label htmlFor={id}>
          {label} <span>*</span>
        </label>
        <textarea
          id={id}
          className={clsx(isError && styles._error, isValid && styles._success)}
          {...registerOptions}
          placeholder={placeholder}
        />
      </li>
    );
  }
  if (version === "input") {
    return (
      <li className={styles.item}>
        <label htmlFor={id}>
          {label} <span>*</span>
        </label>
        <input
          id={id}
          className={clsx(isError && styles._error, isValid && styles._success)}
          {...registerOptions}
          placeholder={placeholder}
        />
      </li>
    );
  }
}
