import Image from 'next/image';
import styles from './card.module.scss';

export default function StructureCard({header, text, image}) {
  
  return (
      <div className={styles.cardStyle}>
        <Image src={image} alt="Card Image" width={300} height={157} /> 
        <div className={styles.textCard}>
          <div>
            <h2>{header}BAZA TRAINEE UKRAINE</h2>
            <p>{text}Lorem ipsum dolor sit amet consectetur. Semper sed nulla donec a amet eget egestas.Lorem ipsum dolor sit amet consectetur. Semper sed nulla donec a amet eget egestas.Lorem ipsum dolor sit amet.{text}</p>        
          </div>
        </div>
      </div>
  );
}