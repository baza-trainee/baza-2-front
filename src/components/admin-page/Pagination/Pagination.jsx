import styles from './Pagination.module.scss'
import clsx from 'clsx'
import { Icon } from '../../shared/Icon/Icon'

export default function Pagination({ pagination , hendleSetPage}) {
const{ currentPage, totalPages } = pagination;

  const nextPage = () => {
    if(currentPage < totalPages){
      hendleSetPage(currentPage+1)
    }else return
  }

  const prevtPage = () => {
    if(currentPage > 1){
      hendleSetPage(currentPage-1)
    }else return
  }

  const firstPage=()=>{
    hendleSetPage(1)
  }

  return (
    <div className={styles.pagination}>
      <button type='button' 
        disabled={currentPage === 1} 
        className={clsx(styles.btn)} 
        onClick={firstPage}>  
        <Icon 
          name={'carousel-arrow'} 
          className={styles.icon_prev} 
          width={20} height={30}/>
        <Icon 
          name={'carousel-arrow'} 
          className={styles.icon_prev} 
          width={20} height={30}/>
      </button>

      <button type='button' 
        disabled={currentPage === 1} 
        className={clsx(styles.btn)} 
        onClick={prevtPage}>  
        <Icon 
          name={'carousel-arrow'} 
          className={styles.icon_prev} 
          width={30} height={30}/>
      </button>

      <div className={styles.info}>
        <p>{currentPage}</p>
        <span>з</span>
        <p>{totalPages}</p>
      </div>

      <button type='button' 
        disabled={currentPage === totalPages} 
        className={styles.btn} 
        onClick={nextPage}>  
        <Icon 
          name={'carousel-arrow'} 
          className={styles.icon_next} 
          width={30} height={30}/>
      </button>
    </div>
  )
}