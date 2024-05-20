import { Icon } from "../Icon/Icon";
import styles from './CloseBtn.module.scss'
import clsx from "clsx";

export default function CloseBtn({ ariaLabel, onClick, className }) {
  return <button 
    type='button' 
    aria-label={ariaLabel} 
    onClick={onClick} 
    className={clsx(styles.btn, className)}><Icon name='close'/>
  </button>
}