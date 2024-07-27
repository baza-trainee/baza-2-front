import { Icon } from "../Icon/Icon";
import styles from './CloseBtn.module.scss'
import clsx from "clsx";

export default function CloseBtn({ ariaLabel, onClick, className, vaiant }) {
  return <button 
    type='button' 
    aria-label={ariaLabel} 
    onClick={onClick} 
    className={clsx(styles.btn, className)}><Icon name={vaiant==='dark'?'close_dark':'close'}/>
  </button>
}