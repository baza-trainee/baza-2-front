'use client';
import styles from './PressForm.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  PressAddFormScheme, 
  pressDefaultValues, 
  PressFormScheme 
} from './PressFormScheme';
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import TextArea from '@/src/components/shared/inputs/TextArea/TextArea';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate';
import ImagePreview from '../../ImagePreview/ImagePreview';

export default function PressForm({
  hendleMutate, 
  data, 
  variant='edit', 
  submitBtnText= 'Додати'
}) {
  
  const router = useRouter();
  const[ prevUrl, setPrevUrl ] = useState(null)
  const scheme = variant === 'add' ? PressAddFormScheme : PressFormScheme
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
  } = useForm({ 
    defaultValues: {...pressDefaultValues}, 
    resolver: zodResolver(scheme), 
    mode: 'onChange'
  });

  const resetForm = () => {
    router.replace('/admin/press-about')
    reset();
  }

  useEffect(()=>{
    if(data){
      const{imageUrl, title, description, date, link } = data
      setValue('title',title )
      setValue('description', description )
      setValue('link', link )
      setValue('date',formatDateToNumericInputDate({timestamp:date}))
      setValue('file', '')
      setPrevUrl(imageUrl)
    }else setValue('date',formatDateToNumericInputDate({timestamp:Date.now()}))
    
  },[data])

  const onSubmit = (data) => {
    const newData = {
      title:data.title,
      description: data.description,
      link: data.link,
      date: data.date,
      file: data.file,
    }
    hendleMutate(newData)
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
            id={"title"}
            maxLength={55}
            className={styles.item}
            required={false}
            placeholder={"Введіть назву"}
            registerOptions={register("title", { ...scheme.title })}
            isError={errors.title}
            isValid={isValid}
            version={"input_admin"}
            label={'Назва статті'}
            locale={'ua'}
          />
        </li>

        <li className={clsx(styles.list_item,styles.grid2 )}>
          <InputDate
            id={"date"}
            className={styles.item}
            required={false}
            registerOptions={register("date", { ...scheme.date})}
            isError={errors.date}
            isValid={isValid}
            version={"input_admin"}
            label={'Дата'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.item_prev, styles.grid3)}>
          <InputField
            id={"link"}
            className={styles.item}
            required={false}
            placeholder={"Додайте посилання"}
            registerOptions={register("link", { ...scheme.link })}
            isError={errors.link}
            isValid={isValid}
            version={"input_admin"}
            label={'Посилання на статтю'}
          />
        </li>

        <li className={clsx(styles.list_item, styles.item_prev, styles.grid4)}>
          <InputFile
            id={"file"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrl }
            required={variant === 'add'}
            accept="image/*"
            placeholder={ prevUrl ? prevUrl: "Завантажте зображення"}
            registerOptions={register("file", { ...scheme.file })}
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Зображення'}
          />
            <ImagePreview imageUrl={prevUrl} variant='blog'/>
        </li>

        <li className={clsx(styles.list_item, styles.grid5)}>
          <TextArea 
            id={"description"}   
            maxLength={305}
            className={styles.item_text} 
            isError={errors.description}
            isValid={isValid}
            registerOptions={register("description", { ...scheme.description })}
            required={false}
            placeholder={"Введіть текст"} 
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