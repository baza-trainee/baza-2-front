import styles from './WelcomeAdmin.module.scss'
import SectionAdmin from '../SectionAdmin/SectionAdmin'

export default function WelcomeAdmin() {
  return (
  <SectionAdmin title={'Baza Trainee Ukraine'}>
    <h2 className={styles.title}>Ласкаво просимо на сторінку адміністратора</h2>
    <p className={styles.text}>Адміністратор платформи має можливість керувати наповненням сайту - додавати, редагувати та вилучати динамічні елементи платформи (картки проєктів, лого партнерів, відгуки, дані каунтера, контактну інформацію, документи). 
</p>
<p className={styles.text}>Адміністратор виконує також функції контент-райтера проєкту.</p>

<p className={styles.sub_text}>Команда Baza Trainee Ukraine бажає вам легкої роботи.</p>
  </SectionAdmin>
  )
}