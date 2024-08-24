import styles from './MembersList.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import switchLocaleAdmin from '@/src/state/switchLocaleAdmin';
import { createKey } from '@/src/lib/utils/createKey';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import Pagination from '../../Pagination/Pagination';

export default function MembersList({data, hendleRemove, hendleSetPage}) {
  const router = useRouter();
  // Мова сторінки.
  const locale = switchLocaleAdmin(state => state.localeAdmin);
  // Шляхи сторінок
  const editMemberPath = '/admin/members/edit'
 
  const[ idMember, setIdIdMember] = useState(null)

  const closeModal=()=>{
    setIdIdMember(null)
  }

  const okRemove=()=>{
    hendleRemove(idMember)
    setIdIdMember(null)
  }

  return(
    <>
      {data?.results?.length ? <ul className={styles.list}>
        {data.results.map((el)=>{
          return <li key={createKey()} className={styles.item}>
           <h3>{el.name[locale]}</h3>
            <div className={styles.btns}>
              <MainButton variant='admin' 
                className={styles.btn} 
                onClick={()=>{router.push(`${editMemberPath}/${el._id}`)}}>
                <Icon  width={24} height={24} name='edit'/>
              </MainButton>

              <MainButton variant='admin' onClick={()=>{setIdIdMember(el._id)}} className={styles.btn}>
                <Icon width={24} height={24} name='remove'/>
              </MainButton>
            </div>
          </li>
        })}
        {data.pagination.totalPages > 1 && <li className={styles.pagination}>
          <Pagination pagination={data.pagination} 
            hendleSetPage={hendleSetPage}
            />
          </li>
        }
        </ul> : 
        <>
          <p className={styles.length}>Вибачте, інформації не знайдено.</p>
          <p className={styles.length}>Додайте учасника.</p>
        </>
      }

      <AdminModal isOpen={idMember} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити учасника?'} btnBlok={true}></AdminModal>
    </>
  )
}