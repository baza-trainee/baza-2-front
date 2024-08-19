'use client';
import styles from './TeamForm.module.scss'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamDefaultValues, TeamScheme } from './teamFormScheme';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getAllMembers } from '@/src/api/members';

//teamFormScheme
export default function TeamForm({
  hendleMutate, 
  data1,
  submitBtnText= 'Додати'
}) {
  const router = useRouter();

  const [ search, setSearch ] = useState('')
  const [ member, setMember ] = useState(null)
  const {  data, refetch } = useQuery({ queryKey: ['members', search], 
    queryFn:()=>{return getAllMembers({search:search})}, keepPreviousData: true });


  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    trigger,
    setValue,
  } = useForm({ defaultValues: {...teamDefaultValues}, resolver: zodResolver(TeamScheme), mode: 'onChange'});





  const resetForm = () => {
    //router.replace('/admin/members')
    reset();
  }

  useEffect(()=>{
    if(member){
      const{ name, profileUrl} = member
      setValue('name_ua',name.ua )
      setValue('name_en',name.en )
      setValue('name_pl',name.pl )
      setValue('profileUrl',profileUrl )
    }
  },[member])

  const onSubmit = (data) => {
    const newData = {
      name: {
        en: data.name_en,
        pl: data.name_pl,
        ua: data.name_ua,
      },
      profileUrl: data.profileUrl,
    }
    hendleMutate(newData)
  };

  const isDisabled = () => {
    if (isError) {
      return true;
    } else 
    if (!isDirty) {
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
            isError={errors.name_pl}
            isValid={isValid}
            version={"input_admin"}
            locale={'pl'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.grid4)}>
          <InputField
            id={"profileUrlgg"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Додайте посилання"}
            registerOptions={register("profileUrl", { ...TeamScheme.profileUrl})}
            isError={errors.profileUrl}
            isValid={isValid}
            version={"input_admin"}
            label={'Спеціалізація'}
          />
        </li>

        <li className={clsx(styles.list_item, styles.grid5)}>
          <InputField
            id={"profileUrl"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Додайте посилання"}
            registerOptions={register("profileUrl", { ...TeamScheme.profileUrl})}
            isError={errors.profileUrl}
            isValid={isValid}
            version={"input_admin"}
            label={'Linkedin'}
          />
        </li>
 { !member && <li className={clsx(styles.list_item, styles.grid6)}>
    {data &&  data.results.map((el)=>{
        return <p key={el._id} onClick={()=>{
          setMember(el)
          trigger("name_ua")
        }
        }>{el.name['ua']}</p>
    }) }
        </li>}
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