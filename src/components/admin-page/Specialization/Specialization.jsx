'use client';
import styles from './Specialization.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteRoleById, getAllRoles } from '@/src/api/roles';
import SectionAdmin from '../SectionAdmin/SectionAdmin'
import { Icon } from '../../shared/Icon/Icon'
import MainButton from '../../shared/MainButton/MainButton'
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';
import SpecializationList from './SpecializationList/SpecializationList';

export default function Specialization() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const [ search, setSearch ] = useState('')
  const addMembePath = '/admin/specialization/add'
  // Запит на базу
  const { isError, data, refetch } = useQuery({ queryKey: ['specialization', search], 
    queryFn:()=>{return getAllRoles({search:search})}, keepPreviousData: true });
   console.log(data) 
// Запит на видалення
  const deleteRole = useMutation({
    mutationFn:(id) => {
      return deleteRoleById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})

 return( 
    <SectionAdmin title={'Спеціалізація'} hendleSearch={setSearch} lang={true}>

      <div className={styles.wrapper}>
        <h2>Назва</h2>
        <MainButton  variant='admin' className={styles.btn} onClick={()=>{
            router.push(addMembePath)
          }}>
            <Icon name={'plus_icon'} width={24} height={24} />
          {'Додати'}</MainButton >
      </div>

      
      {isError ?
        <>
          <p className={styles.error}>Помилка завантаження контенту.</p>
          <p className={styles.error}>Оновіть сторінку або спробуйте пізніше.</p>
        </>:
        <>
          {data && <SpecializationList data={data.results} hendleRemove={ deleteRole.mutate }/>}
        </>
      }

      { deleteRole.isPending && <Loader/> }

      <UseAlert/>
    </SectionAdmin>
  )
}

[
  {
      "name": {
          "en": "Business Analyst",
          "pl": "Analityk biznesowy",
          "ua": " Бізнес-аналітик"
      },
      "_id": "64cd52a5aae6a74d83cafaa4",
      "__v": 0
  },
  {
      "name": {
          "en": "Back-end",
          "pl": "Back-end",
          "ua": "Бек-енд"
      },
      "_id": "651497e6812102a60b645285",
      "__v": 0
  },
  {
      "name": {
          "en": "Product Owner",
          "pl": "Właściciel produktu",
          "ua": "Власник продукту"
      },
      "_id": "64bec5ff990e31224c4fbab0",
      "__v": 0
  },
  {
      "name": {
          "en": "Design",
          "pl": "Projektowanie",
          "ua": "Дизайн"
      },
      "_id": "651497b3812102a60b64526d",
      "__v": 0
  },
  {
      "name": {
          "en": "Quality Assurance",
          "pl": "Zapewnienie jakości",
          "ua": "Забезпечення якості"
      },
      "_id": "65149800812102a60b645293",
      "__v": 0
  },
  {
      "name": {
          "en": "Project Manager",
          "pl": "Kierownik projektu",
          "ua": "Менеджер проекту"
      },
      "_id": "64a712cbdb445f869fd0e185",
      "__v": 0
  },
  {
      "name": {
          "en": "Business Analyst Mentor",
          "pl": "Mentor analityka biznesowego",
          "ua": "Ментор бізнес-аналітика"
      },
      "_id": "64a712d4db445f869fd0e187",
      "__v": 0
  },
  {
      "name": {
          "en": "Project Manager Mentor",
          "pl": "Mentor menadżera projektu",
          "ua": "Ментор менеджера проекту"
      },
      "_id": "64ac499ccddf4bb4063adcfe",
      "__v": 0
  },
  {
      "name": {
          "en": "Front-end",
          "pl": "Front-end",
          "ua": "Фронт-енд"
      },
      "_id": "651497c9812102a60b645279",
      "__v": 0
  },
  {
      "name": {
          "en": "Full Stack",
          "pl": "Pełny stos",
          "ua": "Фул стек"
      },
      "_id": "6532227095d062d08cf22957",
      "__v": 0
  }
]