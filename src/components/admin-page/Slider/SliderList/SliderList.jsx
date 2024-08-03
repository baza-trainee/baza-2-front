
import styles from './SliderList.module.scss'

import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import { useRouter } from '@/src/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function SliderList({data, hendleRemove}) {
  const router = useRouter();
  // Шляхи сторінок
  const editPartnerPath = '/admin/partners/edit-partner'

  // Мова сторінки.
  const { locale } = useParams();
 
  const[ idPartner, setIdPartner ] = useState(null)

  const closeModal=()=>{
    setIdPartner(null)
  }

  const okRemove=()=>{
    hendleRemove(idPartner)
    setIdPartner(null)
  }

  return(
    <>
      {data?.length ? <ul className={styles.list}>
      {data.map((el)=>{
        return <li key={createKey()} className={styles.item}>
          
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
    <>
      <p className={styles.length}>Вибачте, інформації не знайдено.</p>
      <p className={styles.length}>Додайте слайд.</p>
    </>
    }

    <AdminModal isOpen={idPartner} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити слайд?'} btnBlok={true}></AdminModal>
    </>
  )
}