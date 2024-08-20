'use client';
import styles from './PressForm.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import TextArea from '@/src/components/shared/inputs/TextArea/TextArea';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { PressDefaultValues, PressScheme } from './addPressScheme';
import ImagePreview from '../../ImagePreview/ImagePreview';
// import PressPreview from '../PressPreview/PressPreview';


export default function PressForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Додати'
}) {
  const router = useRouter();
  const[ prevUrl, setPrevUrl ] = useState(null)

  const[ valueDate, setValueDate ] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({ defaultValues: {...PressDefaultValues}, resolver: zodResolver(PressScheme), mode: 'onChange'});

  const resetForm = () => {
    router.replace('/admin/press-about')
    reset();
  }

  useEffect(()=>{
    if(isSuccess){
      reset();
    }
  },[isSuccess])

  console.log(valueDate)

  useEffect(()=>{
    if(data){
      const{imageUrl, title, press} = data
      setValue('title_ua',title )
      setValue('text_ua',press )
      setValue('file', '')
      setPrevUrl(imageUrl)
    }
  },[data])

  const onSubmit = (data) => {
    console.log(data)

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

        <li className={clsx(styles.list_item, styles.grid_item3)}>
          <InputField
            id={"title_ua"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Назва статті"}
            registerOptions={register("title_ua", { ...PressScheme.title_ua })}
            isError={errors.title_ua}
            isValid={isValid}
            version={"input_admin"}
            label={"Назва статті"}
            locale={'ua'}
          />
        </li>

        {/* IMAGE */}
        <li className={clsx(styles.list_item, styles.item_prev)}>
          <InputFile
            id={"file"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrl }
            required={false}
            accept="image/*"
            placeholder={"Завантажтe зображення"}
            registerOptions={register("file", { ...PressScheme.file })}
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Зображення'}
          />
          <ImagePreview imageUrl={prevUrl}/>
        </li>

        <li className={clsx(styles.list_item, styles.grid_item3)}>
          <InputField
            id={"article_ua"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Додайте посилання"}
            registerOptions={register("title_ua", { ...PressScheme.title_ua })}
            isError={errors.title_ua}
            isValid={isValid}
            version={"input_admin"}
            label={"Стаття в Linkedin"}

          />
        </li>

        <li className={clsx(styles.list_item)}>
          <TextArea 
            id={"text_ua"}   
            className={styles.item_text} 
            isError={errors.text_ua}
            isValid={isValid}
            registerOptions={register("text_ua", { ...PressScheme.text_ua })}
            required={false}
            placeholder={"Текст"} 
            label={'Текст'} 
            locale={'ua'}/>
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