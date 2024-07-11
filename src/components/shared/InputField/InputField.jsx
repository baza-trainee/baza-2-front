import styles from "./InputField.module.scss";
import clsx from "clsx";

export default function InputField({
  id,
  maxLength=300,
  placeholder = "",
  registerOptions = {},
  isError,
  isValid,
  version,
  label = null,
  className,
  required=true,
  options = {},
  ...props
}) {

  if (version === "textArea") {
    return (
      <div className={styles.item}>
        { label && <label htmlFor={id}>
            {label} {required && <span>*</span>}
          </label>
        }
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
        {label && <label htmlFor={id}>
            {label} {required && <span>*</span>}
          </label>
        }
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
