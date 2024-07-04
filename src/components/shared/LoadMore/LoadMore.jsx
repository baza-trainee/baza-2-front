'use client'

import styles from './LoadMore.module.scss'

const LoadMore = () => {
    const handlerClick = () => {
        
    }
    return <button onClick={handlerClick} className={styles.btn} type="button">Load more</button>;
}

export default LoadMore;