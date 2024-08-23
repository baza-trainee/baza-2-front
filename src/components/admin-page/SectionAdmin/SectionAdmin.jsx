import styles from './SectionAdmin.module.scss'
import clsx from 'clsx'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'

export default function SectionAdmin({title,  children, hendleSearch, lang, defaultValue, nav, className}) {
  return  (
    <section className={clsx(styles.section, className)}>
      <HeaderAdmin 
        title={title} 
        hendleSearch={hendleSearch} 
        lang={lang} 
        defaultValue={defaultValue} nav={nav}/>
      <div className={styles.srroll_wrapper}>
        {children}
      </div>
    </section>
  )
}