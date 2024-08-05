'use client';
import styles from './ReviewForm.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import TextArea from '@/src/components/shared/inputs/TextArea/TextArea';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { ReviewDefaultValues, ReviewScheme } from './ReviewScheme';
import ReviewPreview from '../ReviewPreview/ReviewPreview';

export default function ReviewForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Зберегти зміни'
}) {
  const router = useRouter();

  const[ prevUrl, setPrevUrl ] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({ defaultValues: {...ReviewDefaultValues}, resolver: zodResolver(ReviewScheme), mode: 'onChange'});

  const resetForm = () => {
    router.replace('/admin/reviews')
    reset();
  }

  useEffect(()=>{
    if(isSuccess){
      reset();
    }
  },[isSuccess])

  useEffect(()=>{
    if(data){
      const{imageUrl, title, subtitle} = data
      setValue('title_ua',title.ua )
      setValue('title_en',title.en )
      setValue('title_pl',title.pl )
      setValue('text_ua',subtitle.ua )
      setValue('text_en',subtitle.en )
      setValue('text_pl',subtitle.pl )
      setValue('file', '')
      setPrevUrl(imageUrl)
    }
  },[data])

  const onSubmit = (data) => {
    const newData = {
      title: {
        en: data.title_en,
        pl: data.title_pl,
        ua: data.title_ua
      },
      subtitle: {
        en: data.text_en,
        pl: data.text_pl,
        ua: data.text_ua
      },
      file: data.file[0],
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
        <li className={clsx(styles.list_item, styles.grid_item1)}>
          <InputFile
            id={"file"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrl }
            required={false}
            accept="image/*"
            placeholder={"Завантажте зображення"}
            registerOptions={register("file", { ...ReviewScheme.file })}
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Зображення'}
          />
        </li>
        <li className={clsx(styles.list_item, styles.grid_item2)}>
          <ReviewPreview imageUrl={prevUrl}/>
        </li>

        <li className={clsx(styles.list_item, styles.grid_item3)}>
          <InputField
            id={"title_ua"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Заголовок"}
            registerOptions={register("title_ua", { ...ReviewScheme.title_ua })}
            isError={errors.title_ua}
            isValid={isValid}
            version={"input_admin"}
            label={'Заголовок'}
            locale={'ua'}
          />
        </li>

        <li className={clsx(styles.list_item, styles.grid_item4)}>
          <InputField
            id={"title_en"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Заголовок"}
            registerOptions={register("title_en", { ...ReviewScheme.title_en })}
            isError={errors.title_en}
            isValid={isValid}
            version={"input_admin"}
            locale={'en'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.grid_item5)}>
          <InputField
            id={"title_pl"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Заголовок"}
            registerOptions={register("title_pl", { ...ReviewScheme.title_pl})}
            isError={errors.title_pl}
            isValid={isValid}
            version={"input_admin"}
            locale={'pl'}
          />
        </li> 


        <li className={clsx(styles.list_item, styles.grid_item6)}>
          <TextArea 
            id={"text_ua"}   
            className={styles.item_text} 
            isError={errors.text_ua}
            isValid={isValid}
            registerOptions={register("text_ua", { ...ReviewScheme.text_ua })}
            required={false}
            placeholder={"Основний текст"} 
            label={'Основний текст'} locale={'ua'}/>
        </li>

        <li className={clsx(styles.list_item, styles.grid_item7)}>
          <TextArea 
            id={"text_en"}   
            className={styles.item_text} 
            isError={errors.text_en}
            isValid={isValid}
            registerOptions={register("text_en", { ...ReviewScheme.text_en })}
            required={false}
            placeholder={"Основний текст"} 
            locale={'en'}/>
        </li>
        <li className={clsx(styles.list_item, styles.grid_item8)}>
          <TextArea 
            id={"text_pl"}   
            className={styles.item_text} 
            isError={errors.text_pl}
            isValid={isValid}
            registerOptions={register("text_pl", { ...ReviewScheme.text_pl })}
            required={false}
            placeholder={"Основний текст"} 
            locale={'pl'}/>
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