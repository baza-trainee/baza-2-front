'use client';
import styles from './BlogArticleForm.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import TextArea from '@/src/components/shared/inputs/TextArea/TextArea';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { ArticleAddScheme, articleDefaultValues, ArticleScheme } from './BlogArticleFormScheme';
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate';
import ImagePreview from '../../ImagePreview/ImagePreview';
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';

export default function BlogArticleForm({
  hendleMutate, 
  data,
  variant='edit', 
  submitBtnText= 'Додати'
}) {
  const router = useRouter();
  const[ prevUrl, setPrevUrl ] = useState(null)
  const[ tooltip, setTooltip ] = useState(null)

  const scheme = variant === 'add' ? ArticleAddScheme : ArticleScheme

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({ 
    defaultValues: {...articleDefaultValues}, 
    resolver: zodResolver(scheme), 
    mode: 'onChange'
  });

  const resetForm = () => {
    router.replace('/admin/blog')
    reset();
  }

  useEffect(()=>{
    if(data){
      const{imageUrl, title, text, date } = data
      setValue('title', title )
      setValue('text', text )
      setValue('date', formatDateToNumericInputDate({timestamp:date}))
      setValue('file', '')
      setPrevUrl(imageUrl)
    }else setValue('date', formatDateToNumericInputDate({timestamp:Date.now()}))
  },[data])

  const onSubmit = (data) => {
    const newData = {
      title: data.title,
      text: data.text,
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

  const validateTitle=(name, maxLength)=>{
    if(getValues(name).length > maxLength){
      setTooltip(name)
    }else {
      setTooltip(null)
    }
  }

  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.grid1, styles.tooltip)}>
          <InputField
            id={"title"}
            maxLength={105}
            className={styles.item}
            required={false}
            placeholder={"Введіть назву"}
            registerOptions={register("title", { ...scheme.title })}
            onInput={()=>{validateTitle("title", 50)}}
            isError={errors.title}
            isValid={isValid}
            version={"input_admin"}
            label={'Назва статті'}
            locale={'ua'}
          />

          <TooltipText 
            className={clsx(tooltip === "title" && styles._active)} 
            text={'Рекомендована довжина до 50 символів. Максимальна 100 символів' } 
            position='bottom'/>
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
        </li>

        <li className={clsx(styles.list_item, styles.item_prev, styles.grid4)}>
          <ImagePreview imageUrl={prevUrl} variant='blog'/>
        </li>

        <li className={clsx(styles.list_item, styles.grid5)}>
          <TextArea 
            id={"text"}   
            maxLength={2005}
            className={styles.item_text} 
            isError={errors.text}
            isValid={isValid}
            registerOptions={register("text", { ...scheme.text })}
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