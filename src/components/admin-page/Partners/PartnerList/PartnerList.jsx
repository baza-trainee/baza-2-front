import { useRouter } from '@/src/navigation'
import { createKey } from '@/src/lib/utils/createKey'
import PartnerCard from '@/src/components/shared/PartnerCard/PartnerCard'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import styles from './PartnerList.module.scss'

export default function PartnerList({data}) {
  const router = useRouter();

  return ( <>
    {data?.length ? <ul className={styles.list}>
      {data.map((el)=>{
        return <li key={createKey()} className={styles.item}>
          <PartnerCard item={el} className={styles.card}/>
          <div className={styles.btns}>
            <MainButton variant='admin' 
              className={styles.btn} 
              onClick={()=>{router.push(`/admin/partners/edit-partner/${el._id}`)}}>
              <Icon  width={24} height={24} name='edit'/>
            </MainButton>

            <MainButton variant='admin' className={styles.btn}>
              <Icon width={24} height={24} name='remove'/>
            </MainButton>
          </div>
        </li>
      })}
    </ul>: null
    }
  </>
  )
}