'use client';
import styles from './SlideForm.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import TextArea from '@/src/components/shared/inputs/TextArea/TextArea';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { SliderDefaultValues, SliderScheme } from './SliderScheme';
import ImagePreview from '../../ImagePreview/ImagePreview';
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';

export default function SlideForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Зберегти зміни'
}) {
  const router = useRouter();

  const[ prevUrl, setPrevUrl ] = useState(null)
  const[ tooltip, setTooltip ] = useState(null)

  const tooltipTitleMessage = 'Рекомендована довжина заголовка від 5 до 30 символів. Максимальна 40 символів';
  const tooltipTextMessage = 'Рекомендована довжина основного тексту від 5 до 300 символів. Максимальна 350 символів';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({ defaultValues: {...SliderDefaultValues}, resolver: zodResolver(SliderScheme), mode: 'onChange'});

  const resetForm = () => {
    router.replace('/admin/slider')
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

  const validateTitle=(name, maxLength)=>{
    if(getValues(name).length > maxLength){
      setTooltip(name)
    }else {
      setTooltip(null)
    }
  }

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
        <li className={clsx(styles.list_item, styles.grid_item1)}>
          <InputFile
            id={"file"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrl }
            required={false}
            accept="image/*"
            placeholder={"Завантажте зображення"}
            registerOptions={register("file", { ...SliderScheme.file })}
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
            lang={"uk"}
            maxLength={41}
            className={styles.item}
            required={false}
            placeholder={"Заголовок"}
            registerOptions={register("title_ua", { ...SliderScheme.title_ua })}
            onInput={()=>{validateTitle("title_ua", 30)}}
            onFocus={()=>{setTooltip(null)}}
            isError={errors.title_ua}
            isValid={isValid}
            version={"input_admin"}
            label={'Заголовок'}
            locale={'ua'}
          />

          <TooltipText className={clsx(tooltip === "title_ua" && styles._active)} text={tooltipTitleMessage} position='bottom'/>
        </li>

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item4)}>
          <InputField
            id={"title_en"}
            lang={"en"}
            maxLength={41}
            className={styles.item}
            required={false}
            placeholder={"Заголовок"}
            registerOptions={register("title_en", { ...SliderScheme.title_en })}
            onInput={()=>{validateTitle("title_en", 30)}}
            onFocus={()=>{setTooltip(null)}}
            isError={errors.title_en}
            isValid={isValid}
            version={"input_admin"}
            locale={'en'}
          />

          <TooltipText className={clsx(tooltip === "title_en" && styles._active)} text={tooltipTitleMessage} position='bottom'/>
        </li> 

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item5)}>
          <InputField
            id={"title_pl"}
            lang={"pl"}
            maxLength={41}
            className={styles.item}
            required={false}
            placeholder={"Заголовок"}
            registerOptions={register("title_pl", { ...SliderScheme.title_pl})}
            onInput={()=>{validateTitle("title_pl", 30)}}
            onFocus={()=>{setTooltip(null)}}
            isError={errors.title_pl}
            isValid={isValid}
            version={"input_admin"}
            locale={'pl'}
          />
          <TooltipText className={clsx(tooltip === "title_pl" && styles._active)} text={tooltipTitleMessage} position='bottom'/>
        </li> 

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item6)}>
          <TextArea 
            id={"text_ua"}  
            lang={"uk"}
            maxLength={351}
            className={styles.item_text} 
            isError={errors.text_ua}
            isValid={isValid}
            registerOptions={register("text_ua", { ...SliderScheme.text_ua })}
            onInput={()=>{validateTitle("text_ua", 300)}}
            onFocus={()=>{setTooltip(null)}}
            required={false}
            spellcheck="true"
            placeholder={"Основний текст"} 
            label={'Основний текст'} 
            locale={'ua'}/>

          <TooltipText className={clsx(tooltip === "text_ua"  && styles._active)} text={tooltipTextMessage} position='bottom'/>   
        </li>

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item7)}>
          <TextArea 
            id={"text_en"}   
            lang={"en"}
            maxLength={351}
            className={styles.item_text} 
            isError={errors.text_en}
            isValid={isValid}
            registerOptions={register("text_en", { ...SliderScheme.text_en })}
            onInput={()=>{validateTitle("text_en", 300)}}
            onFocus={()=>{setTooltip(null)}}
            required={false}
            spellcheck="true"
            placeholder={"Основний текст"} 
            locale={'en'}/>

          <TooltipText className={clsx(tooltip === "text_en"  && styles._active)} text={tooltipTextMessage} position='bottom'/>  
        </li>

        <li className={clsx(styles.list_item, styles.tooltip, styles.grid_item8)}>
          <TextArea 
            id={"text_pl"}  
            lang={'pl'}
            maxLength={351}
            className={styles.item_text} 
            isError={errors.text_pl}
            isValid={isValid}
            registerOptions={register("text_pl", { ...SliderScheme.text_pl })}
            onInput={()=>{validateTitle("text_pl", 300)}}
            onFocus={()=>{setTooltip(null)}}
            required={false}
             spellcheck="true"
            placeholder={"Основний текст"} 
            locale={'pl'}/>

          <TooltipText className={clsx(tooltip === "text_pl" && styles._active)} text={tooltipTextMessage} position='bottom'/>   
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