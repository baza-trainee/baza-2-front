"use client";
import styles from "./InputDate.module.scss";
import clsx from "clsx";

export default function InputDate({
  id,
  registerOptions = {},
  isError,
  isValid,
  min,
  max,
  // valueAsDate,
  //value,
  // valueAsNumber,
  isDirty,
  label = null,
  locale,
  className,
  required=true,
  disabled=false,
  options = {},
  ...props
}) {

  return (
    <div className={clsx(styles.input_admin, className,  disabled && styles._disabled,)}>
      <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
        {label?label:'label title'} {required && <span>*</span>}
      </label>

      <div className={styles.wrapper}>

        <input
          id={id}
          type="date"
          min={min}
          max={max}
          // valueAsDate={valueAsDate}
          // valueAsNumber={valueAsNumber}
          disabled={disabled}
          className={clsx(
            styles.input,
            isError && styles._error,
            isValid && styles._success,
          )}
          {...registerOptions}
          //placeholder={placeholder}
          {...props}
        />
        </div>
      <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
    </div>
  );
}
