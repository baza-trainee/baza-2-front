import clsx from 'clsx'
import InputSearch from '../../shared/InputSearch/InputSearch'
import LangDropdown from '../../shared/LangDropdown/LangDropdown'
import styles from './HeaderAdmin.module.scss'

export default function HeaderAdmin({variant,title}) {

  return(
    <header className={styles.header}>
      <h1>{title}</h1>

      <div className={clsx(styles.options, !variant && styles._hide)}>
        <InputSearch/>
        <LangDropdown/>
      </div>
    </header>
  )
}