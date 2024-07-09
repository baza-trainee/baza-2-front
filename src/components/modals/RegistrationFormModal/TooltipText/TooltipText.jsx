import styles from './TooltipText.module.scss'
import clsx from 'clsx'
import { Icon } from '@/src/components/shared/Icon/Icon'
//На скріні - приклад!!!
export default function TooltipText({className}) {
  return(
    <div className={clsx(styles.tooltiptext, className)}>
      <p>Ім'я користувача в discord. 
        Увага! Скопіюйте свій нік і надішліть в правильному вигляді! 
      </p>

      <div className={styles.example}>
        <h3 className={styles.title}>Приклад:</h3>
        <p className={styles.title}>ВІДОБРАЖУВАНЕ ІМ'Я</p>
        <p className={clsx(styles.text, styles.error)}>Baza_Trainee_Ukraine_admin</p>
      </div>
      <div className={styles.example}>
        <p className={styles.title}>ІМ'Я КОРИСТУВАЧА</p>
        <p className={styles.text}>baza_trainee_ukraine_admin <span className={styles.icon}><Icon name={'check'} width={20} height={20}/></span></p>
      </div>
    </div>
  )
}