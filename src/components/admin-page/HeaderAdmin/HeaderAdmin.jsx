import clsx from 'clsx'
import InputSearch from '../../shared/inputs/InputSearch/InputSearch'
import LangDropdown from '../../shared/LangDropdown/LangDropdown'
import styles from './HeaderAdmin.module.scss'

export default function HeaderAdmin({ title, hendleSearch, lang, defaultValue }) {

  return(
    <header className={styles.header}>
      <h1>{title}</h1>

      <div className={clsx(styles.options)}>
        {hendleSearch && <InputSearch onSubmit={hendleSearch} defaultValue={defaultValue} className={styles.inputSearch}/>}
        {lang && <LangDropdown/>}
      </div>
    </header>
  )
}