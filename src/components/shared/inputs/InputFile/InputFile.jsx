"use client";
import { useEffect, useState } from 'react';
import styles from './InputFile.module.scss'
import { Icon } from '../../Icon/Icon';
import clsx from 'clsx';
import { ACCEPTED_IMAGE_TYPES, checkFileType, MAX_FILE_SIZE_IMG } from '@/src/lib/hooks/checkFileType';

export default function InputFile({
  id,
  placeholder = "",
  registerOptions = {},
  isError,
  isValid,
  isDirty,
  label = null,
  className,
  required=true,
  disabled=false,
  options = {},
  getPrevImgUrl=()=>{},
  ...props
}) {

  const [ value, setValue ] = useState('');

  useEffect(()=>{
    if(!isDirty){
      setValue('')
    }
  },[isDirty])

  function sub(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setValue('')
      return
    }

    const file = e.target.files[0];
    if(file && typeof file === 'object'){

      if(file ?.size < MAX_FILE_SIZE_IMG && checkFileType(file,ACCEPTED_IMAGE_TYPES)){
        setValue(file.name)
        getPrevImgUrl(URL.createObjectURL(file))
      }else{
        getPrevImgUrl(null)
      }
      setValue(file.name)
    }
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
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
          disabled={disabled}
          onInput={(e)=>{sub(e)}}
          className={styles.input}
          {...registerOptions}
          required={required}
          {...props}
        />
        {<p className={styles.placeholder}>{value ? value : placeholder}</p>}
          <div className={styles.icon}> 
            <Icon name={'download'} className={styles.btn} width={24} height={24}/> 
          </div> 
        </label>
      <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
    </div>
  );
}
