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
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';



export default function PressForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Додати'
}) {
  const router = useRouter();
  const[ prevUrl, setPrevUrl ] = useState(null)
  const[ tooltip, setTooltip ] = useState(null)

  const tooltipTitleMessage = 'Рекомендована довжина заголовка від 5 до 30 символів. Максимальна 40 символів';
  const tooltipTextMessage = 'Рекомендована довжина основного тексту від 5 до 300 символів. Максимальна 360 символів';

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
      setTooltip(null)
      setTooltip(null)
      reset();
    }
  },[isSuccess])


  useEffect(()=>{
    if(data){
      const{imageUrl, title, press} = data
      setValue('title_ua',title )
      setValue('text_ua',press )
      setValue('file', '')
      setPrevUrl(imageUrl)
    }
  },[data])


  const validateTitle=(name, maxLength)=>{
    if(getValues(name).length > maxLength){
      setTooltip(name)
    }else {
      setTooltip(null)
    }
  }

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
        <li className={clsx(styles.list_item, styles.grid_item1)}>
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
        </li>
        <li className={clsx(styles.list_item, styles.grid_item2)}>
          <ImagePreview imageUrl={prevUrl}/>
        </li>

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item3)}>
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
          <TooltipText className={clsx(tooltip === "title_ua" && styles._active)} text={tooltipTitleMessage} position='bottom'/>

        </li>

        <li className={clsx(styles.list_item, styles.grid_item4)}>
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

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item5)}>
          <TextArea 
            id={"text_ua"}  
            maxLength={380}
            className={styles.item_text} 
            isError={errors.text_ua}
            isValid={isValid}
            registerOptions={register("text_ua", { ...PressScheme.text_ua })}
            onInput={()=>{validateTitle("text_ua", 300)}}
            onFocus={()=>{setTooltip(null)}}
            required={false}
            version='input_textarea'
            spellcheck="true"
            placeholder={"Основний текст"} 
            label={'Основний текст'} 
            locale={'ua'}/>

          <TooltipText className={clsx(tooltip === "text_ua"  && styles._active)} text={tooltipTextMessage} position='bottom'/>   
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