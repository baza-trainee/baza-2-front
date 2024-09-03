'use client';
import styles from './TeamForm.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMembers } from '@/src/api/members';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamDefaultValues, TeamScheme } from './teamFormScheme';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import switchLocaleAdmin from '@/src/state/switchLocaleAdmin';
import { createKey } from '@/src/lib/utils/createKey';

export default function TeamForm({
  hendleMutate, 
  hendleCancel,
  setSelectedRole,
  roles,
  submitBtnText= 'Додати'
}) {
  // Мова сторінки.
  const locale = switchLocaleAdmin(state => state.localeAdmin);
  const [ search, setSearch ] = useState('')
  const [ member, setMember ] = useState(null)
  const [selectedRoleId, setSelectedRoleId] = useState('');

  // Шукаємо учасника в базі
  const { data } = useQuery({ queryKey: ['members', search], 
    queryFn:()=>{return getAllMembers({ search:search, limit:100 })}, keepPreviousData: true 
  });
  // Валідація данних
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError },
    reset,
    trigger,
    setValue,
  } = useForm({ 
    defaultValues: {...teamDefaultValues}, 
    resolver: zodResolver(TeamScheme), 
    mode: 'onChange'
  });

  const resetForm = () => {
    reset();
    hendleCancel()
  }

  useEffect(()=>{
    if(member){
      const{ name, profileUrl} = member
      setValue('name_ua',name.ua )
      setValue('name_en',name.en )
      setValue('name_pl',name.pl )
      setValue('profileUrl',profileUrl )
      trigger("name_ua")
    }
  },[member])



  const onSubmit = (data) => {
    const newData={}
    // Якщо учасник є в базі
    if(member){
      hendleMutate(member) 
    }else{
      // Данні нового учасника
      newData.name= {
          en: data.name_en,
          pl: data.name_pl,
          ua: data.name_ua,
        }
      newData.profileUrl= data.profileUrl
      hendleMutate(newData)
    }
  };

  // Функція вибору спеціальності
  const handleOptionSelect = (e) => {
    const selectedRole = roles?.find((item) => item._id === e.target.value);
    if (selectedRole) {
      setSelectedRoleId(e.target.value);
      setValue('specialization', e.target.value )
      trigger("specialization")
      setSelectedRole(selectedRole)
    }
  };


  const isDisabled = () => {
    if (isError) {
      return true;
    }  
    else if(!isValid){
      return true
    }
    else return false
  }

  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.grid1)}>
          <InputField
            id={"name_ua"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Ім’я та Прізвище"}
            registerOptions={register("name_ua", { ...TeamScheme.name_ua })}
            onInput={(e)=>{
              setMember(null)
              setSearch(e.target.value)}
            }
            readOnly={member}
            isError={errors.name_ua}
            isValid={isValid}
            version={"input_admin"}
            label={'Учасник'}
            locale={'ua'}
          />
        </li>

        <li className={clsx(styles.list_item, styles.grid2)}>
          <InputField
            id={"name_en"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Ім’я та Прізвище"}
            registerOptions={register("name_en", { ...TeamScheme.name_en })}
            readOnly={member}
            isError={errors.name_en}
            isValid={isValid}
            version={"input_admin"}
            locale={'en'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.grid3)}>
          <InputField
            id={"name_pl"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Ім’я та Прізвище"}
            registerOptions={register("name_pl", { ...TeamScheme.name_pl})}
            readOnly={member}
            isError={errors.name_pl}
            isValid={isValid}
            version={"input_admin"}
            locale={'pl'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.grid4)}>
          <div className={styles.wrapper}>
            <h4 className={styles.label}>Спеціалізація</h4>
          <select
            {...register("specialization", { ...TeamScheme.specialization})}
            className={clsx(
              styles.select,
              errors?.specialization && styles._error,
              isValid && styles._success
            )}
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
          <p className={styles.error}>{errors?.specialization?.message}</p>
          </div>
        </li>

        <li className={clsx(styles.list_item, styles.grid5)}>
          <InputField
            id={"profileUrl"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Додайте посилання"}
            registerOptions={register("profileUrl", { ...TeamScheme.profileUrl})}
            readOnly={member}
            isError={errors.profileUrl}
            isValid={isValid}
            version={"input_admin"}
            label={'Linkedin'}
          />
        </li>
        { !member && <li className={clsx(styles.list_item, styles.grid6)}>
          {data && data.results.length ? 
          <>
            <h4>Оберіть учасника зі списку</h4>
            {data.results.map((el)=>{
              return <p key={createKey()} onClick={()=>{
                setMember(el)
              }
              }>{el.name[locale]}</p>
            })}</> : 
            <>
              <h4>Такого учасника не знайдено. </h4>
              <h4>Додайте нового учасника до бази</h4>
            </>
          }
        </li>
        }
      </ul>

      <div className={styles.btns}>
        <MainButton
          type="submit"
          className={styles.btn}
          disabled={isDisabled()}
        >
          {submitBtnText}
        </MainButton>

        <MainButton
          variant='admin'
          className={styles.btn_cancel}
          onClick={()=>{resetForm()}}
        >
          {'Скасувати'}
        </MainButton>
      </div >
    </form>
  )
}