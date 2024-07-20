import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import styles from './Settings.module.scss'
import SettingsForm from './SettingsForm/SettingsForm'

export default function Settings() {
  return (
    <section className={styles.section}>
      <HeaderAdmin title={'Налаштування'}/>
      <div className={styles.srroll_wrapper}>
        <SettingsForm/>
      </div>
    </section>
  )
}