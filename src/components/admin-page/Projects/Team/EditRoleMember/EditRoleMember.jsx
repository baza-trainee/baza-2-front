'use client';
import styles from './EditRoleMember.module.scss'
import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '@/src/api/roles';
import { useState } from 'react';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import { createKey } from '@/src/lib/utils/createKey';

export default function EditRoleMember({roles, data}) {

  const[ selectedRole, setSelectedRole ] = useState(null)
  const [selectedRoleId, setSelectedRoleId] = useState('');

  // Отримуємо всі спеціальності
//   const getRoles = useQuery({ queryKey: ['editroles'], 
//     queryFn:()=>{return getAllRoles()}, keepPreviousData: true });
// console.log(getRoles)
  // Функція вибору спеціальності
  const handleOptionSelect = (e) => {
    const selectedRole = roles.find((item) => item._id === e.target.value);
    if (selectedRole) {
      setSelectedRoleId(e.target.value);
      // setValue('specialization', e.target.value )
      // trigger("specialization")
      setSelectedRole(selectedRole)
    }
  };
  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h3>Name</h3>
        <div className={styles.wrapper}>
          {/* <h4 className={styles.label}>Спеціалізація</h4> */}
          <select
            className={styles.select}
              onChange={handleOptionSelect}
              value={selectedRoleId}
            >
            {!selectedRoleId && <option value="" className={styles.option} readOnly>Оберіть спеціалізацію</option>}
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
          //type="submit"
          className={styles.btn}
          //disabled={isDisabled()}
        >
          {'Зберегти зміни'}
        </MainButton>
      </div>


    </div>
  )
}