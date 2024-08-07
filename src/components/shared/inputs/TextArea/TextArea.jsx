"use client";
import styles from "./TextArea.module.scss";
import clsx from "clsx";
//import { Icon } from "../../Icon/Icon";

export default function TextArea({
  id,
  lang='uk',
  maxLength=300,
  placeholder = "",
  registerOptions = {},
  isError,
  isValid,
  isDirty,
  label = null,
  locale,
  className,
  required=true,
  spellcheck='false',
  options = {},
  ...props
}) {
  return (
    <div className={clsx(styles.input_textarea, className)}>
      <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
        {label?label:'label title'} {required && <span>*</span>}
      </label>
      
      <div className={styles.wrapper}>
        <textarea
          id={id}
          lang={lang}
          maxLength={maxLength}
          className={clsx(
            styles.textarea,
            isError && styles._error,
            isValid && styles._success
          )}
          {...registerOptions}
          placeholder={placeholder}
          {...props}
          spellcheck={spellcheck}
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
      <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
    </div>
  );
}