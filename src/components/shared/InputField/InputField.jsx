"use client";
import { useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";
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
  className,
  required=true,
  disabled=false,
  options = {},
  ...props
}) {
  const [ visible, setVisible ] = useState(false);
  const [ value, setValue ] = useState('');

  useEffect(()=>{
    if(!isDirty && version === "file"){
      setValue('')
    }
  },[isDirty,version])

  function sub(e) {
    if(e.target.value){
      const file = e.target.value;
      const fileName = file.split("\\");
      setValue(fileName[fileName.length - 1])
    }else setValue('')
  }


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
        {label && <label htmlFor={id}>
            {label} {required && <span>*</span>}
          </label>
        }
        <div className={styles.wrapper}>
          <input
            id={id}
            maxLength={maxLength}
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
          {iconName && 
            <div className={styles.icon}> 
              <Icon name={iconName} className={styles.svg} width={24} height={24}/> 
            </div> 
          }
        </div>
        {isError && <p className={styles.error}>{isError.message}</p>}
      </div>
    );
  }

  if (version === "password") {
    return (
      <div className={clsx(styles.input_admin, className)}>
        {label && <label htmlFor={id}>
            {label} {required && <span>*</span>}
          </label>
        }
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
            <Icon className={styles.btn} width={24} height={24} name={visible?'open_eye':'closed_eye'}/>
          </button>

        </div>
        {isError && <p className={styles.error}>{isError.message}</p>}
      </div>
    );
  }

  if (version === "file") {
    return (
      <div className={clsx(styles.input_file, className)}>
        {label && <label htmlFor={id}>
            {label} {required && <span>*</span>}
          </label>
        }
          <label className={clsx(
              styles.input_file,
              isError && styles._error,
              isValid && styles._success
            )}htmlFor={id}>

          <input
            id={id}
            maxLength={maxLength}
            disabled={disabled}
            onInput={(e)=>{sub(e)}}
            className={clsx(
              styles.input,
              isError && styles._error,
              isValid && styles._success
            )}
            {...registerOptions}
            
            {...props}
          />
          {value ? value : <span className={styles.placeholder}>{placeholder}</span>}
            <div className={styles.icon}> 
              <Icon name={'download'} className={styles.btn} width={24} height={24}/> 
            </div> 
          </label>
        {isError && <p className={styles.error}>{isError.message}</p>}
      </div>
    );
  }
}
