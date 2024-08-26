import Image from 'next/image'
import styles from './BlogCard.module.scss'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'
import { formatDateToNumeric } from '@/src/lib/utils/formatData'
import { truncateString } from '@/src/lib/utils/truncateString'

export default function BlogCard({data, hendleclick}) {

  const {title, text, date, imageUrl, _id} = data

  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <Image src={createImageUrl(imageUrl)}
          alt={title}
          fill
          sizes="100%"/>
        <p className={styles.date}>{formatDateToNumeric(date)}</p>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{truncateString(text,400)}</p>
      <button 
        className={styles.btn} 
        type="button" onClick={()=>{hendleclick(data)}}>Читати матеріал</button>
    </div>
  )
}