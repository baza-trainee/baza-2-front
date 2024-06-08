import styles from './Loader.module.scss';

export default function Loader() {
  return  (
    <div class={styles.wrapper}>
      <span class={styles.loader}></span>
    </div>
  )
}