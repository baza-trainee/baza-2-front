import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import styles from './SectionAdmin.module.scss'

export default function SectionAdmin({title,  children, hendleSearch, lang, defaultValue}) {
  return  (
    <section className={styles.section}>
      <HeaderAdmin title={title} hendleSearch={hendleSearch} lang={lang} defaultValue={defaultValue}/>
      <div className={styles.srroll_wrapper}>
        {children}
      </div>
    </section>
  )
}