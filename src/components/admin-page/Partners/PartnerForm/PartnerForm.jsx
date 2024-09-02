'use client';
import styles from './PartnerForm.module.scss'
import { useEffect } from 'react';
import { useRouter } from '@/src/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPartnerDefaultValues, addPartnerSchema } from './addPartnerScheme';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';

export default function PartnerForm({
  hendleMutate, 
  handlePrevImg, 
  data,
  submitBtnText= 'Додати', 
  prevImg
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
  } = useForm({ 
    defaultValues: {...addPartnerDefaultValues}, 
    resolver: zodResolver(addPartnerSchema), 
    mode: 'onChange'
  });

  const resetForm = () => {
    router.replace('/admin/partners')
    reset();
  }

  useEffect(()=>{
    if(data){
      const{name, imageUrl, homeUrl} = data
      setValue('name', name)
      setValue('homeUrl', homeUrl)
      setValue('file', '')
      handlePrevImg(imageUrl)
    }
  },[data])

  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      homeUrl: data.homeUrl,
      file: data.file,
    }
    hendleMutate(newData)
  };
    
  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
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
          <InputFile
            id={"file"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ handlePrevImg }
            required={false}
            accept="image/*"
            placeholder={prevImg ? prevImg : "Оберіть фото"}
            registerOptions={register("file", { ...addPartnerSchema.file })}
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Логотип'}
          />
        </li>
        <li className={styles.list_item}>
          <InputField
            id={"homeUrl"}
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