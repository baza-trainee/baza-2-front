import styles from './PartnerList.module.scss'
import { useState } from 'react'
import { useRouter } from '@/src/navigation'
import { createKey } from '@/src/lib/utils/createKey'
import PartnerCard from '@/src/components/shared/PartnerCard/PartnerCard'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import MessageErrorLoading from '@/src/components/shared/MessageErrorLoading/MessageErrorLoading'

export default function PartnerList({data, hendleRemove}) {
  const router = useRouter();
  const editPartnerPath = '/admin/partners/edit'

  const[ idPartner, setIdPartner ] = useState(null)

  const closeModal=()=>{
    setIdPartner(null)
  }

  const okRemove=()=>{
    hendleRemove(idPartner)
    setIdPartner(null)
  }
  
  return ( <>
    {data?.length ? <ul className={styles.list}>
      {data.map((el)=>{
        return <li key={createKey()} className={styles.item}>
          <PartnerCard item={el} className={styles.card}/>
          <div className={styles.btns}>
            <MainButton variant='admin' 
              className={styles.btn} 
              onClick={()=>{router.push(`${editPartnerPath}/${el._id}`)}}>
              <Icon  width={24} height={24} name='edit'/>
            </MainButton>

            <MainButton variant='admin' onClick={()=>{setIdPartner(el._id)}} className={styles.btn}>
              <Icon width={24} height={24} name='remove'/>
            </MainButton>
          </div>
        </li>
      })}
    </ul> : 
    <MessageErrorLoading variant='search'/> 
    }

    <AdminModal isOpen={idPartner} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити партнера?'} btnBlok={true}></AdminModal>
  </>
  )
}