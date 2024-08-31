import MainButton from '@/src/components/shared/MainButton/MainButton'
import styles from './PrevDocumentButton.module.scss'
import { Icon } from '@/src/components/shared/Icon/Icon'
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';

export default function PrevDocumentButton({prevUrl, hendleSetPrev}) {
  // Стан модалки попереднього перегляду
  const open = stateModalDocumentPdf(state => state.open);

  return (
    <MainButton  
      variant='admin' 
      className={styles.placeholder} 
      onClick={()=>{    
        if(prevUrl){
          hendleSetPrev(prevUrl)
          open()
        }}
      } 
      disabled={!prevUrl}
      >
      <Icon className={styles.svg} 
        name={'pdf-placeholder'} 
        width={70} 
        height={70}/>
      <Icon className={styles.icon_screen} 
        name={'full_screen'} 
        width={30} 
        height={30}/>
    </MainButton>
  )
}