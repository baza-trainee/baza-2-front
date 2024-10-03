import styles from './PartnerPreview.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import { createImageUrl, imageLoader } from '@/src/lib/hooks/createImageUrl'

export default function PartnerPreview({imageUrl}) {
  return (
    <div className={styles.preview}>
      <div className={clsx(styles.partnerCardItem,!imageUrl && styles._noimage)}>
        <div className={styles.img_wrap}>
          <Image
            className={styles.img}
            loader={imageLoader}
            src={imageUrl ? imageUrl :'/images/placeholder-image/no-image.png'}
            alt={'Попередній перегляд логотипу'}
            fill
            sizes="100%"
            />
        </div>
      </div>
    </div>
  )
}