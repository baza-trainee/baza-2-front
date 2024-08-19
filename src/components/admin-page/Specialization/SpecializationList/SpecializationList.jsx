import styles from './SpecializationList.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import switchLocaleAdmin from '@/src/state/switchLocaleAdmin';
import { createKey } from '@/src/lib/utils/createKey';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'

export default function SpecializationList({data, hendleRemove}) {
  const router = useRouter();
  // Мова сторінки.
  const locale = switchLocaleAdmin(state => state.localeAdmin);
  // Шляхи сторінок
  const editRolePath = '/admin/specialization/edit'
 
  const[ idRole, setIdIdRole] = useState(null)

  const closeModal=()=>{
    setIdIdRole(null)
  }

  const okRemove=()=>{
    hendleRemove( idRole)
    setIdIdRole(null)
  }

  return(
    <>
      {data?.length ? <ul className={styles.list}>
        {data.map((el)=>{
          return <li key={createKey()} className={styles.item}>
           <h3>{el.name[locale]}</h3>
            <div className={styles.btns}>
              <MainButton variant='admin' 
                className={styles.btn} 
                onClick={()=>{router.push(`${editRolePath}/${el._id}`)}}>
                <Icon  width={24} height={24} name='edit'/>
              </MainButton>

              <MainButton variant='admin' onClick={()=>{setIdIdRole(el._id)}} className={styles.btn}>
                <Icon width={24} height={24} name='remove'/>
              </MainButton>
            </div>
          </li>
        })}
        </ul> : 
        <>
          <p className={styles.length}>Вибачте, інформації не знайдено.</p>
          <p className={styles.length}>Додайте спеціалізацію.</p>
        </>
      }

      <AdminModal isOpen={ idRole} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити спеціалізацію?'} btnBlok={true}></AdminModal>
    </>
  )
}