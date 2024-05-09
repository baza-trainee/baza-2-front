import styles from "./InputField.module.scss";
import clsx from "clsx";
import { Controller } from "react-hook-form";

export default function InputField({
  id,
  placeholder = "default placeholder",
  registerOptions = {},
  isError,
  isValid,
  version,
  label = "default label",
  options = {},
  control = {},
}) {
  if (version === "checkBox") {
    const totalOptions = options.length;
    const halfOptions = Math.ceil(totalOptions / 2);
    const checkboxHeight = 55;
    const groupHeight = halfOptions * checkboxHeight;
    return (
      <div className={styles.item}>
        {id !== "agree" && (
          <label htmlFor={id}>
            {label} <span>*</span>
          </label>
        )}
        <div
          className={styles.checkboxGroup}
          style={{ height: `${groupHeight}px` }}
        >
          {options.map((option) => (
            <div className={styles.checkbox} key={option.id}>
              <Controller
                name={option.id}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className={styles.boxInput}
                      type="checkbox"
                      {...field}
                      checked={field.value}
                    ></input>
                    <label
                      htmlFor={option.id}
                      className={clsx(
                        styles.boxLabel1,
                        id === "agree" && styles.boxLabel2
                      )}
                    >
                      {option.label}
                    </label>
                  </>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
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
