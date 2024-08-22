import styles from './SectionAdmin.module.scss'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'

export default function SectionAdmin({title,  children, hendleSearch, lang, defaultValue, nav}) {
  return  (
    <section className={styles.section}>
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