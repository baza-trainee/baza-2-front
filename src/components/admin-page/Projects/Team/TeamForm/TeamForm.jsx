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
  hendleCancel,
  roles,
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
    const newData = {
      name: {
        en: data.name_en,
        pl: data.name_pl,
        ua: data.name_ua,
      },
      profileUrl: data.profileUrl,
      specialization:data.specialization
    }
    console.log(newData)
    //hendleMutate(newData)
  };


  const [selectedRoleId, setSelectedRoleId] = useState('');

  const handleOptionSelect = (e) => {
    const selectedRole = roles?.find((item) => item._id === e.target.value);
    if (selectedRole) {
      setSelectedRoleId(e.target.value);
      // setValue('specialization', e.target.value )
      trigger("specialization")
      // updTeamMemberRole(teamMember._id, teamMemberRole._id, selectedRole);
    }
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
            // registerOptions={register("specialization", { ...TeamScheme.specialization})}
            {...register("specialization", { ...TeamScheme.specialization})}
            className={styles.select}
              // className="w-full rounded-lg border border-neutral-100 bg-transparent p-3 placeholder-gray-400"
              onChange={handleOptionSelect}
              value={selectedRoleId}
            >
            <option value="" className={styles.option} readOnly>Оберіть спеціалізацію</option>
            {!selectedRoleId && <option />}
            {roles &&
              roles.length > 0 &&
              roles.map((item) => (
                <option key={item._id} 
                  className={styles.option}
                  //className="rounded-md py-3" 
                  value={item._id}>
                  {item.name.en}
                </option>
              ))}
          </select>
          <p>{errors?.specialization?.message}</p>
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
    {data &&  data.results.map((el)=>{
        return <p key={el._id} onClick={()=>{
          setMember(el)
          
        }
        }>{el.name['ua']}</p>
    }) }
        </li>}
      </ul>

      <div className={styles.btns}>
        <MainButton
          type="submit"
          className={styles.btn}
          //disabled={isDisabled()}
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