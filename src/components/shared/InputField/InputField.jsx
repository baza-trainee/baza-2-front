import styles from "./InputField.module.scss";
import clsx from "clsx";

export default function InputField({
  id,
  maxLength=300,
  placeholder = "default placeholder",
  registerOptions = {},
  isError,
  isValid,
  version,
  label = "default label",
  className,
  options = {},
  ...props
}) {

  if (version === "textArea") {
    return (
      <div className={styles.item}>
        <label htmlFor={id}>
          {label} <span>*</span>
        </label>
        <textarea
          id={id}
          maxLength={maxLength}
          className={clsx(
            styles.input,
            isError && styles._error,
            isValid && styles._success
          )}
          {...registerOptions}
          placeholder={placeholder}
        />
      </div>
    );
  }
  if (version === "input") {
    return (
      <div className={clsx(styles.item, className)}>
        <label htmlFor={id}>
          {label} <span>*</span>
        </label>
        <input
          id={id}
          maxLength={maxLength}
          className={clsx(
            styles.input,
            isError && styles._error,
            isValid && styles._success
          )}
          {...registerOptions}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
}
