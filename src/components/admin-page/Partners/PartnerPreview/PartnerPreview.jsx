import Image from 'next/image'
import styles from './PartnerPreview.module.scss'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'
import clsx from 'clsx'

export default function PartnerPreview({imageUrl}) {

  return (
    <div className={styles.preview}>
      <div className={clsx(styles.partnerCardItem,!imageUrl && styles._noimage)}>
        <div className={styles.img_wrap}>
          <Image
            className={styles.img}
            src={imageUrl ? createImageUrl(imageUrl) :'/images/placeholder-image/no-image.png'}
            alt={'Попередній перегляд логотипу'}
            fill
            sizes="100%"
            />
        </div>
      </div>
    </div>
  )
}