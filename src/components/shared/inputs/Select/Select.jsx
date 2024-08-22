"use client";
import { useState } from "react";
import { Icon } from "../../Icon/Icon";
import styles from "./InputField.module.scss";
import clsx from "clsx";

export default function InputField({
  id,
  options,
  placeholder = "",
  registerOptions = {},
  isError,
  errorMessage='',
  isValid,
  iconName,
  isDirty,
  label = null,
  className,
  required=true,
  disabled=false,
  ...props
}) {

  return (
    <div className={clsx(styles.wrapper, className)}>
      <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
        {label?label:'label title'} {required && <span>*</span>}
      </label>
      <select id={id}
        name={id}
        disabled={disabled}
        className={clsx(
          styles.select,
          isError && styles._error,
          isValid && styles._success,
        )}
        {...registerOptions}
        //placeholder={placeholder}
        {...props}>

        <option value="" className={styles.option} readonly>{placeholder}</option>
        {options?.length &&
              options.map((item) => (
                <option key={item.id} 
                  className={styles.option}
                  //className="rounded-md py-3" 
                  value={item.id}>
                  {item.name}
                </option>
              ))}

      </select>
      <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
    </div>
  );
}



