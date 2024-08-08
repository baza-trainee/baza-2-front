"use client";
import styles from "./InputDate.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { Icon } from "../../Icon/Icon";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";

export default function InputDate({
  id,
  //maxLength=300,
  //placeholder = "",
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
    <div className={clsx(styles.input_admin, className)}>
      <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
        {label?label:'label title'} {required && <span>*</span>}
      </label>
      {/* <div className={styles.wrapper}> */}
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
            isValid && styles._success
          )}
          {...registerOptions}
          //placeholder={placeholder}
          {...props}
        />
        {/* <div className={styles.icon} type="button"> 
          <Icon name={'calendar_dark'} className={styles.svg} width={24} height={24}/> 
        </div>  */}
        </div>
      {/* </div> */}
      <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
    </div>
  );
}
