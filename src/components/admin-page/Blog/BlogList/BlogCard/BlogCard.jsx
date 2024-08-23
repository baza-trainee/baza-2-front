import Image from 'next/image'
import styles from './BlogCard.module.scss'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData'

export default function BlogCard({data}) {

  const {title, text, date, imageUrl} = data
//   {
//     "title": "example",
//     "text": "Long text",
//     "date": 1669872000000,
//     "imageUrl": "image.jpg"
//   }

  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <Image src={createImageUrl(imageUrl)}
          alt={title}
          fill
          sizes="100%"/>
        <p className={styles.date}>{formatDateToNumericInputDate({timestamp:date})}</p>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  )
}