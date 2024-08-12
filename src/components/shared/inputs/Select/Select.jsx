import clsx from 'clsx'
import styles from './Select.module.scss'
import { Icon } from '../../Icon/Icon'
import { useState } from 'react';
//selected
export default function Select({
  id,
  placeholder='',
  label,
  isValid,
  isError,
  className,
  required,
  registerOptions,
  ...props
}) {
  const [ visible, setVisible ] = useState(true);
  const [ value, setValue ] = useState('');


  return(
    <div className={clsx(styles.input_password, className)}>
      <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
        {label?label:'label title'} {required && <span>*</span>}
      </label>
      <div className={styles.wrapper} onClick={()=>{setVisible(!visible)}}>
        <input
          id={id}
          //readOnly
          value={value}
          
          //maxLength={maxLength}clsx(styles.btn_icon, hideMenu && styles._active)
          //disabled={disabled}
         // type={visible?'text':'password'}
          className={clsx(
            styles.input,
            isError && styles._error,
            isValid && styles._success
          )}
          {...registerOptions}
          placeholder={placeholder}
          {...props}
        />
        <button type='button' className={styles.icon}>
          <Icon className={clsx(styles.btn, visible && styles._active)} width={15} height={15} name={'carousel-arrow'}/>
        </button>

      </div>
      <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>

      <ul className={clsx(styles.options, visible && styles._hide)}>
        <li onClick={()=>{
          setValue('Формування команди')
          //hendlrSetValue('Формування команди')
          setVisible(true)
        }}>Формування команди</li>
        <li onClick={()=>{
          setValue('В розробці')
          setVisible(true)
        }}>В розробці</li>
        <li onClick={()=>{
          setValue('Завершено')
          setVisible(true)
        }}>Завершено</li>
      </ul>

    </div>
  )

  // return(
  //   <div className={clsx(styles.wrapper, className)}>
  //     <label htmlFor={id} className={styles.label}>{label}</label>
  //     <select className={styles.select} name={placeholder} id={id}>
  //       <option value="" selected disabled hidden>{placeholder}</option>
  //       <option value="value1">В розробці</option>
  //       <option value="value2">Завершено</option>
  //       <option value="value3">Формування команди</option>
  //     </select>
  //     <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>
  //   </div>
  // )
}