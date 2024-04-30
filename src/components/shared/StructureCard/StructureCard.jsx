import Image from 'next/image';
import styles from './StructureCard.module.scss';
import logo from './images/logo.svg';

export default function StructureCard({header, text, image}) {
  
  return (
      <div className={styles.cardStyle}>
        <div className={styles.svgWrapper}>
          <Image className={styles.imageWrapper} src={logo} alt="Card Image"/> 
        </div>
        <div className={styles.textCard}>
            <p className={styles.header}>  {header}BAZA TRAINEE UKRAINE</p>
            <p className={styles.text}> {text}Громадський проєкт для джуніорів і  світчерів ІТ, який побудований на створенні цифрових проєктів для соціальної сфери України</p>        
        </div>
      </div>
  );
}