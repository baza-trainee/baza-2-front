'use client';
import styles from './PartnerForm.module.scss'
import { useEffect } from 'react';
import { useRouter } from '@/src/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPartnerDefaultValues, addPartnerSchema } from './addPartnerScheme';
import InputField from '@/src/components/shared/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'

export default function PartnerForm({hendleMutate, isSuccess}) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...addPartnerDefaultValues}, resolver: zodResolver(addPartnerSchema), mode: 'onChange'});

  const resetForm = () => {
    reset();
  }

  useEffect(()=>{
    if(isSuccess){
      resetForm()
    }
  },[isSuccess])


  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      homeUrl: data.homeUrl,
      file: data.imageUrl[0],
    }
    hendleMutate(newData)
  };

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } else if(!isValid){
      return true
    }else return false
  }

  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <InputField
            id={"name"}
            maxLength={55}
            className={styles.item}
            required={false}
            placeholder={"Назва"}
            registerOptions={register("name", { ...addPartnerSchema.name })}
            isError={errors.name}
            isValid={isValid}
            version={"input_admin"}
            label={'Назва'}
          />
        </li>
        <li className={styles.list_item}>
          <InputField
            id={"imageUrl"}
            maxLength={55}
            className={styles.item}
            type={'file'}
            required={false}
            accept="image/*"
            placeholder={"Логотип"}
            registerOptions={register("imageUrl", { ...addPartnerSchema.imageUrl })}
            isDirty={isDirty}
            isError={errors.imageUrl}
            isValid={isValid}
            version={"file"}
            label={'Логотип'}
          />
        </li>

        <li className={styles.list_item}>
          <InputField
            id={"homeUrl"}
            maxLength={55}
            className={styles.item}
            required={false}
            placeholder={"Посилання на сайт"}
            registerOptions={register("homeUrl", { ...addPartnerSchema.homeUrl })}
            isError={errors.homeUrl}
            isValid={isValid}
            version={"input_admin"}
            label={'Посилання на сайт'}
          />
        </li>
      </ul>

      <div className={styles.btns}>
        <MainButton
          type="submit"
          className={styles.btn}
          disabled={isDisabled()}
        >
          {'Додати'}
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