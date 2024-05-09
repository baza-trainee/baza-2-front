import { useTranslations } from 'next-intl';
import StructureCardTest from '../shared/StructureCardTest/StructureCardTest';
import styles from './StructureSection.module.scss';


export default function StructureSectionTest() {


  return(
    <div className={styles.mainContainer}>
        <div className={styles.text}>
          <p>Наша структура</p>
        </div>
        <div className={styles.cardContainer}>
          <StructureCardTest /> 
        </div>
    </div>
  )
}