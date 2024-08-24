import styles from './BlogArticle.module.scss'
import Image from 'next/image'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'
import CloseBtn from '@/src/components/shared/CloseBtn/CloseBtn'
import { formatDateToNumeric } from '@/src/lib/utils/formatData'
import { splitTextHalf } from '@/src/lib/utils/splitTextHalf'

export default function BlogArticle({data, close}) {
  const{ title, text, date, imageUrl } = data
  // Розділяємо текст навпіл
  const texts = splitTextHalf(text)

  return (
    <div className={styles.wrapper}>
      <CloseBtn vaiant={'dark'} onClick={()=>{close(null)}}/>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.date}>{formatDateToNumeric(date)}</p>

      {texts.strA && <p className={styles.text}>{texts.strA}</p> }

      <div className={styles.img}>
        <Image src={createImageUrl(imageUrl)}
          alt={title}
          fill
          sizes="100%"/>
      </div>

      {texts.strB && <p className={styles.text}>{texts.strB}</p>}

    </div>
  )
}