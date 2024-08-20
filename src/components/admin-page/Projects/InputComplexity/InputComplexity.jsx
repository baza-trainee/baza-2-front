import clsx from 'clsx'
import styles from './InputComplexity.module.scss'
import { options } from './options'
import { createKey } from '@/src/lib/utils/createKey'
import { useState } from 'react'

export default function InputComplexity({
  id,
  required,
  label,
  className,
  value,
  isValid,
  setValue=()=>{},
  registerOptions={}

}) {

  const[ complexity, setComplexity ] = useState(value)

  const hendleSetValue =(id)=>{
    if(id==1 && complexity === 1){
      setComplexity(0)
      setValue("complexity", 0)
    }else {
      setComplexity(id)
      setValue("complexity",id)
    }
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      <h4 className={clsx(styles.label, !label && styles._hide)}>
        {label ? label:'label title'} {required && <span>*</span>}
      </h4>
      
      <ul className={clsx(styles.input, isValid && styles._success)}>

        {
          options.map((el)=>{
            return (
              <li key={createKey()}>
                <button 
                  className={clsx(styles.btn, el.id <= complexity && styles._active)} type="button" 
                  onClick={()=>{
                    hendleSetValue(el.id)
                  }}></button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}