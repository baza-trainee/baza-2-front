'use client';
import styles from './EditRoleMember.module.scss'
import { useState } from 'react';
import { createKey } from '@/src/lib/utils/createKey';
import { useProjectFormContext } from '../../ProjectFormProvider/ProjectFormProvider';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import CloseBtn from '@/src/components/shared/CloseBtn/CloseBtn';

export default function EditRoleMember({roles, member, close }) {
  const[ selectedRole, setSelectedRole ] = useState(member.teamMemberRole.name['en'])
  const [ selectedRoleId, setSelectedRoleId ] = useState('');

  // Контекст форми
  const{ 
    updTeamMemberRole, 
   } = useProjectFormContext()

  const hendleUpdate=()=>{
    if(selectedRoleId && member.teamMemberRole._id!==selectedRoleId){
      updTeamMemberRole(member.teamMember._id, member.teamMemberRole._id,selectedRole)
      setSelectedRoleId('')
      close()
    }
  }

  // Функція вибору спеціальності
  const handleOptionSelect = (e) => {
    const selectedRole = roles.find((item) => item._id === e.target.value);
    if (selectedRole) {
      setSelectedRoleId(e.target.value);
      setSelectedRole(selectedRole)
    }
  };


  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h3>{member.teamMember.name['ua']}</h3>
        <div className={styles.wrapper}>
          <select
            className={styles.select}
              onChange={handleOptionSelect}
              value={selectedRoleId}
            >
            {!selectedRoleId && <option value="" className={styles.option} readOnly>{selectedRole}</option>}
            {roles &&
              roles.length > 0 &&
              roles.map((item) => (
                <option key={createKey()} 
                  className={styles.option}
                  value={item._id}>
                  {item.name.en}
                </option>
              ))}
          </select>
        </div>

        <MainButton
          onClick={hendleUpdate}
          className={styles.btn}
          disabled={!selectedRoleId}
        >
          {'Зберегти зміни'}
        </MainButton>

        <CloseBtn className={styles.close} onClick={()=>{close()}}/>
      </div>
    </div>
  )
}