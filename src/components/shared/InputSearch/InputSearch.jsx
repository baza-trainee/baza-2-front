import styles from './InputSearch.module.scss'
const InputSearch = () => {
    return <input className={styles.input} type="search" placeholder="Введіть ключове слово " />;
}

export default InputSearch;