import Image from 'next/image'
import styles from './PartnerPreview.module.scss'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'

export default function PartnerPreview({imageUrl}) {

  return (
    <div className={styles.preview}>
      <div className={styles.partnerCardItem}>
        <div className={styles.img_wrap}>
          <Image
            className={styles.img}
            src={imageUrl ? createImageUrl(imageUrl) :'/images/placeholder-image/placeholder-image.png'}
            alt={'Попередній перегляд логотипу'}
            fill
            sizes="100%"
            />
        </div>
      </div>
    </div>
  )
}