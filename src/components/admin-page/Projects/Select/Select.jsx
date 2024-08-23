import clsx from 'clsx'
import styles from './Select.module.scss'
import { Icon } from '../../../shared/Icon/Icon'
import { useEffect, useRef, useState } from 'react';
import { names, options } from './options';
import { createKey } from '@/src/lib/utils/createKey';
//selected
export default function Select({
  id,
  placeholder='',
  label,
  isValid,
  isError,
  className,
  required,
  target,
  value,
  setValueStateProject=()=>{},
}) {
  const [ isOpen, setIsOpen ] = useState(true);
  const menuRef = useRef(null);
  const submenuRef = useRef(null);

  const [ valueOption, setValueOption ] = useState('');

  useEffect(()=>{
    setValueOption(value)
  },[value])

  const handleOutsideClick = (event) => {
    if (
      !submenuRef.current?.contains(event.target) &&
      !(
        event.target === menuRef.current ||
        menuRef.current?.contains(event.target)
      )
    ) {
      setIsOpen(true);
    }
  };

  const hendleSetValue=(el)=>{
    setValueOption(el.id)
    setValueStateProject("isTeamRequired",el.id)
    target("launchDate")
    setIsOpen(true)
  }
  const getName=(value)=>{
    return names[value]
  }

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return(
    <div className={clsx(styles.input_select, className)} ref={menuRef}>
      <label htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
        {label?label:'label title'} {required && <span>*</span>}
      </label>
      <div className={styles.wrapper} onClick={()=>{setIsOpen(!isOpen)}}>
        <label className={clsx(
          styles.input,
          isError &&  styles._error,
          isValid && styles._success
        )} >
          
        <input
          id={id}
          readOnly
          value={valueOption}
        />
          {valueOption ? getName(valueOption): placeholder}
        </label>
        
        <button type='button' className={styles.icon}>
          <Icon className={clsx(styles.btn, isOpen && styles._active)} width={15} height={15} name={'carousel-arrow'}/>
        </button>

      </div>
      <p className={styles.error}>{isError && !isValid ? isError.message :''}</p>

      <ul className={clsx(styles.options, isOpen && styles._hide)} 
        ref={submenuRef}>
          {options.map((el)=>{
            return (
              <li key={createKey()} 
              className={clsx(valueOption == el.id && styles._active)}
              onClick={()=>{
                hendleSetValue(el)
              }}>{el.name}</li>
            )
          })
          }
      </ul>
    </div>
  )
}