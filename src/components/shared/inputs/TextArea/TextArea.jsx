"use client";
import styles from "./TextArea.module.scss";
import clsx from "clsx";
import { Icon } from "../../Icon/Icon";

export default function TextArea({
  id,
  maxLength=500,
  placeholder = "",
  registerOptions = {},
  isError,
  isValid,
  isDirty,
  label = null,
  locale,
  className,
  required=true,
  options = {},
  ...props
}) {
  return (
    <div className={clsx(styles.input_textarea, className)}>
      {label && <label htmlFor={id}>
          {label} {required && <span>*</span>}
        </label>
      }
      <div className={styles.wrapper}>
        <textarea
          id={id}
          maxLength={maxLength}
          className={clsx(
            styles.textarea,
            isError && styles._error,
            isValid && styles._success
          )}
          {...registerOptions}
          placeholder={placeholder}
          {...props}
        />

        {/* {iconName && 
          <div className={styles.icon}> 
            <Icon name={iconName} className={styles.svg} width={24} height={24}/> 
          </div> 
        } */}

        {locale  && <div className={styles.icon}> 
            <p>{locale }</p>  
          </div >
        }
      </div>
      {isError && !isValid && <p className={styles.error}>{isError.message}</p>}
    </div>
  );
}