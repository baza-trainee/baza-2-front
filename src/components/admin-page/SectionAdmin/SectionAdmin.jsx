import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import styles from './SectionAdmin.module.scss'

export default function SectionAdmin({title,  children, hendleSearch, lang}) {
  return  (
    <section className={styles.section}>
      <HeaderAdmin title={title} hendleSearch={hendleSearch} lang={lang}/>
      <div className={styles.srroll_wrapper}>
        {children}
      </div>
    </section>
  )
}