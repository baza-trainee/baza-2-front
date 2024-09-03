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

  const[ removeModal, setRemoveModal] = useState(false)
  const[ editRole, setEditRole] = useState(null)

  const closeModal=()=>{
    setIdIdMember(null)
    setIdIdRole(null)
    setRemoveModal(false)
  }
  
  const closeEditModal=()=>{
    setIdIdMember(null)
    setIdIdRole(null)
    setEditRole(null)
  }

  const okRemove=()=>{
    hendleRemove(idMember,idRole)
    setIdIdMember(null)
    setIdIdRole(null)
    setRemoveModal(false)
  }

  return(
    <>
      {data?.length ? <ul className={styles.list}>
        {data.map((el)=>{
          if(el.teamMember){ 
          return (
          <li key={createKey()} className={styles.item}>
            <h3>{el.teamMember?.name[locale]}</h3>
            <p>{el.teamMemberRole?.name['en']}</p>
            <div className={styles.btns}>
              <MainButton variant='admin' 
                className={styles.btn} 
                onClick={()=>{ 
                  setIdIdRole(el.teamMemberRole?._id)
                  setIdIdMember(el.teamMember?._id)
                  setEditRole(el)
                }}>
                <Icon  width={24} height={24} name='edit'/>
              </MainButton>

              <MainButton variant='admin' onClick={()=>{
                setIdIdRole(el.teamMemberRole?._id)
                setIdIdMember(el.teamMember?._id)
                setRemoveModal(true)}
                } className={styles.btn}>
                <Icon width={24} height={24} name='remove'/>
              </MainButton>
            </div>
          </li>
          )}else return null
        })}
        </ul> : 
        <>
          <p className={styles.length}>Вибачте, інформації не знайдено.</p>
          <p className={styles.length}>Додайте учасника.</p>
        </>
      }

      <AdminModal 
        isOpen={removeModal} 
        handleCallback={closeModal} 
        handleOkCallback={okRemove} 
        title={'Ви впевнені, що хочете видалити учасника?'} 
        btnBlok={true}>
      </AdminModal>

      {editRole && <EditRoleMember 
        roles={roles} 
        member={editRole} 
        close={closeEditModal}/>
      }
    </>
  )
}