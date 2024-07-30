import styles from './PartnerPreview.module.scss'
import PartnerCard from '@/src/components/shared/PartnerCard/PartnerCard'

export default function PartnerPreview({data}) {
  if(!data){return null}

  return (
    <div className={styles.preview}>
      <PartnerCard item={data} className={styles.card}/>
    </div>
  )
}