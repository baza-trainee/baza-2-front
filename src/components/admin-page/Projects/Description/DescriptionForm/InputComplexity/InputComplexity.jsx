import clsx from 'clsx'
import styles from './InputComplexity.module.scss'
import { options } from './options'
import { createKey } from '@/src/lib/utils/createKey'

export default function InputComplexity({
  id,
  required,
  label,
  className,
  value,
  isValid,
  setValue=()=>{},

}) {

  const hendleSetValue =(id)=>{
    if(id==1 && value === 1){
      setValue(0)
    }else setValue(id)
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      <h4 htmlFor={id} className={clsx(styles.label, !label && styles._hide)}>
        {label ? label:'label title'} {required && <span>*</span>}
      </h4>
      <ul className={clsx(styles.input, isValid && styles._success)}>

        {
          options.map((el)=>{
            return (
              <li key={createKey()}>
                <button 
                  className={clsx(styles.btn, el.id <= value && styles._active)} type="button" 
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