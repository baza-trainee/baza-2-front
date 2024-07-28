import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import styles from './SectionAdmin.module.scss'

export default function SectionAdmin({title, variant,  children}) {
  return  (
    <section className={styles.section}>
    <HeaderAdmin title={title}/>
    <div className={styles.srroll_wrapper}>
      {children}
    </div>
  </section>
  )
}