'use client';
import styles from './PartnerForm.module.scss'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPartnerDefaultValues, addPartnerSchema } from './addPartnerScheme';
import InputField from '@/src/components/shared/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { useRouter } from '@/src/navigation';

export default function PartnerForm({hendleMutate, isSuccess, handlePrevImg}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    getValues
  } = useForm({ defaultValues: {...addPartnerDefaultValues}, resolver: zodResolver(addPartnerSchema), mode: 'onChange'});

  const resetForm = () => {
    router.replace('/admin/partners')
    reset();
  }

  useEffect(()=>{
    if(isSuccess){
      reset();
    }
  },[isSuccess])

  useEffect(()=>{
    if(getValues('imageUrl') && !errors.imageUrl && getValues('imageUrl').length > 0){
      handlePrevImg(getValues('imageUrl')[0])
    }else { 
      handlePrevImg(null)
    }
  },[isDirty])

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
            onClick={(e)=>{ 
              reset({ imageUrl : 'imageUrl' })
              handlePrevImg(null)
            }}
            required={false}
            accept="image/*"
            placeholder={"Оберіть файл JPG, PNG, WEBP"}
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