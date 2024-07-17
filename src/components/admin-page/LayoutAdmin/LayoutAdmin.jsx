import NavBar from '../NavBar/NavBar'
import styles from './LayoutAdmin.module.scss'

export default function LayoutAdmin({children}) {
  return (
    <div className={styles.page}>
      <NavBar/>
      <di>

      </di>
      {children}
    </div>
  )
}