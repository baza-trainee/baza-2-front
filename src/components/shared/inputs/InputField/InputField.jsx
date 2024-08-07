"use client";
import { useState } from "react";
import { Icon } from "../../Icon/Icon";
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
  iconName,
  isDirty,
  label = null,
  locale,
  className,
  required=true,
  disabled=false,
  options = {},
  ...props
}) {
  const [ visible, setVisible ] = useState(false);

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
          //readonly
          disabled={disabled}
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

  if (version === "input_admin") {
    return (
      <div className={clsx(styles.input_admin, className)}>
        <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
          {label?label:'label title'} {required && <span>*</span>}
        </label>
        <div className={styles.wrapper}>
          <input
            id={id}
            maxLength={maxLength}
            disabled={disabled}
            className={clsx(
              styles.input,
              isError && styles._error,
              isValid && styles._success,
              iconName && styles._icon,
              locale && styles._icon,
            )}
            {...registerOptions}
            placeholder={placeholder}
            {...props}
          />
          {iconName && 
            <div className={styles.icon}> 
              <Icon name={iconName} className={styles.svg} width={24} height={24}/> 
            </div> 
          }

          {locale  && <div className={styles.icon}> 
              <p>{locale }</p>  
            </div >
          }
        </div>
        <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
      </div>
    );
  }

  if (version === "password") {
    return (
      <div className={clsx(styles.input_admin, className)}>
        <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
          {label?label:'label title'} {required && <span>*</span>}
        </label>
        <div className={styles.wrapper}>
          <input
            id={id}
            maxLength={maxLength}
            disabled={disabled}
            type={visible?'text':'password'}
            className={clsx(
              styles.input,
              isError && styles._error,
              isValid && styles._success
            )}
            {...registerOptions}
            placeholder={placeholder}
            {...props}
          />
          <button type='button' className={styles.icon} onClick={()=>{setVisible(!visible)}}>
            <Icon className={styles.btn} width={24} height={24} name={visible ?'closed_eye':'open_eye'}/>
          </button>

        </div>
        <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
      </div>
    );
  }
}
