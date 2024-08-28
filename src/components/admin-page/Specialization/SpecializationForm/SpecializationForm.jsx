'use client';
import styles from './SpecializationForm.module.scss'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleDefaultValues, RoleScheme } from './SpecializationFormScheme';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'

export default function SpecializationForm({
  hendleMutate, 
  data, 
  submitBtnText= 'Додати'
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
  } = useForm({ defaultValues: {...roleDefaultValues}, resolver: zodResolver(RoleScheme), mode: 'onChange'});

  const resetForm = () => {
    router.replace('/admin/specialization')
    reset();
  }

  useEffect(()=>{
    if(data){
      const{ name } = data
      setValue('name_ua', name.ua )
      setValue('name_en', name.en )
      setValue('name_pl', name.pl )
    }
  },[data])

  const onSubmit = (data) => {
    const newData = {
      name: {
        en: data.name_en,
        pl: data.name_pl,
        ua: data.name_ua,
      },
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
        <li className={styles.list_item}>
          <InputField
            id={"name_ua"}
            maxLength={52}
            className={styles.item}
            required={false}
            placeholder={"Назва спеціалізації"}
            registerOptions={register("name_ua", { ...RoleScheme.name_ua })}
            isError={errors.name_ua}
            isValid={isValid}
            version={"input_admin"}
            label={'Спеціалізація'}
            locale={'ua'}
          />
        </li>

        <li className={styles.list_item}>
          <InputField
            id={"name_en"}
            maxLength={52}
            className={styles.item}
            required={false}
            placeholder={"Назва спеціалізації"}
            registerOptions={register("name_en", { ...RoleScheme.name_en })}
            isError={errors.name_en}
            isValid={isValid}
            version={"input_admin"}
            locale={'en'}
          />
        </li> 

        <li className={styles.list_item}>
          <InputField
            id={"name_pl"}
            maxLength={52}
            className={styles.item}
            required={false}
            placeholder={"Назва спеціалізації"}
            registerOptions={register("name_pl", { ...RoleScheme.name_pl})}
            isError={errors.name_pl}
            isValid={isValid}
            version={"input_admin"}
            locale={'pl'}
          />
        </li> 
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
