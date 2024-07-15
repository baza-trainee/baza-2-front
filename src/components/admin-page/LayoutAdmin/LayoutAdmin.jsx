import styles from './LayoutAdmin.module.scss'

export default function LayoutAdmin({children}) {
  return (
    <div className={styles.page}>
      <aside>Menu</aside>
      {children}
    </div>
  )
}