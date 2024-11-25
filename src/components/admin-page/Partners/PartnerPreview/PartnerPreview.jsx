import styles from './PartnerPreview.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import { imageLoader } from '@/src/lib/hooks/createImageUrl'

export default function PartnerPreview({imageUrl}) {
  const src = imageUrl ? imageUrl : '/images/placeholder-image/no-image.png'

  return (
    <div className={styles.preview}>
      <div className={clsx(styles.partnerCardItem,!imageUrl && styles._noimage)}>
        <div className={styles.img_wrap}>
          {imageUrl ? 
            <Image
              className={styles.img}
              loader={imageLoader}
              src={src}
              alt={'Попередній перегляд логотипу'}
              fill
              sizes="100%"/>:         
          <Image
            className={styles.img}
            src={src}
            alt={'Попередній перегляд логотипу'}
            fill
            sizes="100%"/>
          }
        </div>
      </div>
    </div>
  )
}