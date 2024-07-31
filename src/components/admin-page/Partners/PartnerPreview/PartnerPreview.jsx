import Image from 'next/image'
import styles from './PartnerPreview.module.scss'
import PartnerCard from '@/src/components/shared/PartnerCard/PartnerCard'
import { createImageUrl } from '@/src/lib/hooks/createImageUrl'

export default function PartnerPreview({data}) {
  if(!data){return null}

  return (
    <div className={styles.preview}>
      {data.homeUrl ? 
        <PartnerCard item={data} className={styles.card}/>:
        <div className={styles.partnerCardItem}>
          <div className={styles.img_wrap}>
            <Image
              className={styles.img}
              src={createImageUrl(data.imageUrl)}
              alt={data.name}
              fill
              sizes="100%"
              />
          </div>
        </div>
      }
    </div>
  )
}