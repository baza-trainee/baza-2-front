import styles from './TeamList.module.scss'
import { useState } from 'react';
import switchLocaleAdmin from '@/src/state/switchLocaleAdmin';
import { createKey } from '@/src/lib/utils/createKey';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { Icon } from '@/src/components/shared/Icon/Icon'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal'
import EditRoleMember from '../EditRoleMember/EditRoleMember';

export default function TeamListList({data, hendleRemove=()=>{}, roles}) {
  // Мова сторінки.
  const locale = switchLocaleAdmin(state => state.localeAdmin);
 
  const[ idMember, setIdIdMember] = useState(null)
  const[ idRole, setIdIdRole] = useState(null)

  const closeModal=()=>{
    setIdIdMember(null)
    setIdIdRole(null)
  }

  const okRemove=()=>{
    hendleRemove(idMember,idRole)
    setIdIdMember(null)
    setIdIdRole(null)
  }

  return(
    <>
      {data?.length ? <ul className={styles.list}>
        {data.map((el)=>{
          return <li key={createKey()} className={styles.item}>
           <h3>{el.teamMember.name[locale]}</h3>
           <p>{el.teamMemberRole.name[locale]}</p>
            <div className={styles.btns}>
              <MainButton variant='admin' 
                className={styles.btn} 
                onClick={()=>{ 
                  setIdIdRole(el.teamMemberRole._id)
                  setIdIdMember(el.teamMember._id)
                }}>
                <Icon  width={24} height={24} name='edit'/>
              </MainButton>

              <MainButton variant='admin' onClick={()=>{
                setIdIdRole(el.teamMemberRole._id)
                setIdIdMember(el.teamMember._id)}
                } className={styles.btn}>
                <Icon width={24} height={24} name='remove'/>
              </MainButton>
            </div>
          </li>
        })}
        </ul> : 
        <>
          <p className={styles.length}>Вибачте, інформації не знайдено.</p>
          <p className={styles.length}>Додайте учасника.</p>
        </>
      }

      <AdminModal isOpen={idMember} handleCallback={closeModal} handleOkCallback={okRemove} title={'Ви впевнені, що хочете видалити учасника?'} btnBlok={true}></AdminModal>


    {/* <EditRoleMember roles={roles}/> */}
    </>
  )
}