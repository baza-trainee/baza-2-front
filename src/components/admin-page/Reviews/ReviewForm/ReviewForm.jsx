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
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate';
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData';
import ImagePreview from '../../ImagePreview/ImagePreview';
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';

export default function ReviewForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Додати'
}) {
  const router = useRouter();

  const[ prevUrl, setPrevUrl ] = useState(null)
  const[ tooltip, setTooltip ] = useState(null)

  const tooltipTitNameMessage = 'Рекомендована довжина до 16 символів. Максимальна 18 символів';
  const tooltipRoleMessage = 'Рекомендована довжина до 18 символів. Максимальна 20 символів';

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
      const{imageUrl, name, review, role, date } = data
      setValue('name_ua',name.ua )
      setValue('name_en',name.en )
      setValue('name_pl',name.pl )
      setValue('text_ua',review.ua )
      setValue('text_en',review.en )
      setValue('text_pl',review.pl )
      setValue('role',role )
      setValue('date',formatDateToNumericInputDate({timestamp:date}))
      setValue('file', '')
      setPrevUrl(imageUrl)
    }else setValue('date',formatDateToNumericInputDate({timestamp:Date.now()}))
    
  },[data])

  const validateTitle=(name, maxLength)=>{
    if(getValues(name).length > maxLength){
      setTooltip(name)
    }else {
      setTooltip(null)
    }
  }
  const onSubmit = (data) => {
    const newData = {
      name: {
        en: data.name_en,
        pl: data.name_pl,
        ua: data.name_ua,
      },
      review: {
        en: data.text_en,
        pl: data.text_pl,
        ua: data.text_ua,
      },
      role: data.role,
      date: data.date,
      file: data.file,
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

        <li className={clsx(styles.list_item, styles.tooltip)}>
          <InputField
            id={"name_ua"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Ім’я"}
            registerOptions={register("name_ua", { ...ReviewScheme.name_ua })}
            onInput={()=>{validateTitle("name_ua", 16)}}
            onFocus={()=>{setTooltip(null)}}
            isError={errors.name_ua}
            isValid={isValid}
            version={"input_admin"}
            label={'Ім’я'}
            locale={'ua'}
          />

          <TooltipText className={clsx(tooltip === "name_ua" && styles._active)} text={tooltipTitNameMessage } position='bottom'/>
        </li>

        <li className={clsx(styles.list_item, styles.tooltip)}>
          <InputField
            id={"name_en"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Name"}
            registerOptions={register("name_en", { ...ReviewScheme.name_en })}
            onInput={()=>{validateTitle("name_en", 16)}}
            onFocus={()=>{setTooltip(null)}}
            isError={errors.name_en}
            isValid={isValid}
            version={"input_admin"}
            locale={'en'}
          />

          <TooltipText className={clsx(tooltip === "name_en" && styles._active)} text={tooltipTitNameMessage } position='bottom'/>
        </li> 

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item5)}>
          <InputField
            id={"name_pl"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Imię"}
            registerOptions={register("name_pl", { ...ReviewScheme.name_pl})}
            onInput={()=>{validateTitle("name_pl", 16)}}
            onFocus={()=>{setTooltip(null)}}
            isError={errors.name_pl}
            isValid={isValid}
            version={"input_admin"}
            locale={'pl'}
          />

          <TooltipText className={clsx(tooltip === "name_pl" && styles._active)} text={tooltipTitNameMessage } position='bottom'/>
        </li> 

        <li className={clsx(styles.list_item, styles.tooltip)}>
          <InputField
            id={"role"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Введіть дані"}
            registerOptions={register("role", { ...ReviewScheme.role})}
            onInput={()=>{validateTitle("role", 18)}}
            onFocus={()=>{setTooltip(null)}}
            isError={errors.role}
            isValid={isValid}
            version={"input_admin"}
            label={'Спеціалізація'}
            locale={'en'}
          />

          <TooltipText className={clsx(tooltip === "role" && styles._active)} text={tooltipRoleMessage} position='bottom'/>

        </li> 
        <li className={ styles.list_item }>
        
          <InputDate
            id={"date"}
            className={styles.item}
            required={false}
            registerOptions={register("date", { ...ReviewScheme.date})}
            onClick={()=>{setTooltip(null)}}
            isError={errors.date}
            isValid={isValid}
            version={"input_admin"}
            label={'Дата'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.item_prev)}>
          <InputFile
            id={"file"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrl }
            required={false}
            accept="image/*"
            placeholder={"Завантажте фото"}
            registerOptions={register("file", { ...ReviewScheme.file })}
            onClick={()=>{setTooltip(null)}}
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Фото'}
          />
            <ImagePreview imageUrl={prevUrl} variant='review'/>
        </li>

        <li className={clsx(styles.list_item)}>
          <TextArea 
            id={"text_ua"}   
            maxLength={301}
            className={styles.item_text} 
            isError={errors.text_ua}
            isValid={isValid}
            registerOptions={register("text_ua", { ...ReviewScheme.text_ua })}
            onFocus={()=>{setTooltip(null)}}
            required={false}
            placeholder={"Текст"} 
            label={'Текст'} 
            locale={'ua'}/>
        </li>

        <li className={clsx(styles.list_item)}>
          <TextArea 
            id={"text_en"}   
            maxLength={301}
            className={styles.item_text} 
            isError={errors.text_en}
            isValid={isValid}
            registerOptions={register("text_en", { ...ReviewScheme.text_en })}
            onFocus={()=>{setTooltip(null)}}
            required={false}
            placeholder={"Текст"} 
            locale={'en'}/>
        </li>
        <li className={clsx(styles.list_item)}>
          <TextArea 
            id={"text_pl"}   
            maxLength={301}
            className={styles.item_text} 
            isError={errors.text_pl}
            isValid={isValid}
            registerOptions={register("text_pl", { ...ReviewScheme.text_pl })}
            onFocus={()=>{setTooltip(null)}}
            required={false}
            placeholder={"Текст"}  
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