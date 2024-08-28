"use client";
import styles from "./TextArea.module.scss";
import clsx from "clsx";

export default function TextArea({
  id,
  lang='uk',
  maxLength=300,
  placeholder = "",
  registerOptions = {},
  isError,
  errorMessage='',
  isValid,
  isDirty,
  label = null,
  locale,
  className,
  required=true,
  version = 'input_textarea',
  spellcheck='false',
  options = {},
  ...props
}) {

  if(version === 'input_textarea'){
    return (
      <div className={clsx(styles[version], className)}>
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
            spellCheck={spellcheck}
          />

          {locale  && <div className={styles.icon}> 
              <p>{locale }</p>  
            </div >
          }
        </div>
        <p className={styles.error}>
          {isError && !isValid ? 
          isError.message ? isError.message : 'Присутні не коректні символи' :
          ''}
        </p>
      </div>
    );
  }


  if(version === 'textarea_feedback'){
    return (
      <div className={clsx(styles[version], className)}>
        <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
          {label?label:'label title'} {required && <span>*</span>}
        </label>
    
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
          spellCheck={spellcheck}
        />
        { isError && !isValid && <p className={styles.error}>{errorMessage}</p>}
      </div>
    );
  }

}