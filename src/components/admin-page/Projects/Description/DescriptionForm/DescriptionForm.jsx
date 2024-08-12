'use client';
import clsx from 'clsx'
import styles from './DescriptionForm.module.scss'
import { useState } from 'react'
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate'
import ImagePreview from '../../../ImagePreview/ImagePreview'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectDefaultValues, ProjectScheme } from './descriptionFormScheme';
import Select from '@/src/components/shared/inputs/Select/Select';



export default function DescriptionForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Додати'
}) {
  // const router = useRoute();

 const[ prevUrl, setPrevUrl ] = useState(null)
  // const[ tooltip, setTooltip ] = useState(null)

  // const tooltipTitNameMessage = 'Рекомендована довжина до 16 символів. Максимальна 18 символів';
  // const tooltipRoleMessage = 'Рекомендована довжина до 18 символів. Максимальна 20 символів';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({ defaultValues: {...ProjectDefaultValues}, resolver: zodResolver(ProjectScheme), mode: 'onBlur'});

  // const resetForm = () => {
  //   router.replace('/admin/reviews')
  //   reset();
  // }

  // useEffect(()=>{
  //   if(isSuccess){
  //     reset();
  //   }
  // },[isSuccess])

  // useEffect(()=>{
  //   if(data){
  //     const{imageUrl, name, review, role, date } = data
  //     setValue('name_ua',name.ua )
  //     setValue('name_en',name.en )
  //     setValue('name_pl',name.pl )
  //     setValue('text_ua',review.ua )
  //     setValue('text_en',review.en )
  //     setValue('text_pl',review.pl )
  //     setValue('role',role )
  //     setValue('date',formatDateToNumericInputDate({timestamp:date}))
  //     setValue('file', '')
  //     setPrevUrl(imageUrl)
  //   }else setValue('date',formatDateToNumericInputDate({timestamp:Date.now()}))
    
  // },[data])

  // const validateTitle=(name, maxLength)=>{
  //   if(getValues(name).length > maxLength){
  //     setTooltip(name)
  //   }else {
  //     setTooltip(null)
  //   }
  // }

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
    console.log(newData)
    //hendleMutate(newData)
  };

  // const isDisabled = () => {
  //   if (isError) {
  //     return true;
  //   } else 
  //   if (!isDirty) {
  //     return true;
  //   } 
  //   else if(!isValid){
  //     return true
  //   }
  //   else return false
  // }
 const hendlrSetValue=(value)=>{
  setValue("isTeamRequired",value)
 }
  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

      <ul className={styles.list}>
        <li className={clsx(styles.list_item)}>
          <InputField
            id={"title_ua"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Введіть назву"}
            registerOptions={register("title_ua", { ...ProjectScheme.title_ua })}
            isError={errors.title_ua}
            isValid={isValid}
            version={"input_admin"}
            label={'Назва'}
            locale={'ua'}
          />
        </li>

        <li className={clsx(styles.list_item)}>
          <InputField
            id={"title_en"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Введіть назву"}
            registerOptions={register("title_en", { ...ProjectScheme.title_en })}
            isError={errors.title_en}
            isValid={isValid}
            version={"input_admin"}
            locale={'en'}
          />
        </li> 

        <li className={clsx(styles.list_item)}>
          <InputField
            id={"title_pl"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Введіть назву"}
            registerOptions={register("title_pl", { ...ProjectScheme.title_pl })}
            isError={errors.title_pl}
            isValid={isValid}
            version={"input_admin"}
            locale={'pl'}
          />
        </li>
      </ul>


      <ul className={styles.list}>
        <li className={ styles.list_item }>
          <InputDate
            id={"creationDate"}
            className={styles.item}
            required={false}
            registerOptions={register("creationDate", { ...ProjectScheme.creationDate})}
            isError={errors.creationDate}
            isValid={isValid}
            label={'Дата старту'}
          />
        </li> 

        <li className={ styles.list_item }>
          <InputDate
            id={"launchDate"}
            className={styles.item}
            required={false}
            registerOptions={register("launchDate", { ...ProjectScheme.launchDate})}
            isError={errors.launchDate}
            isValid={isValid}
            label={'Дата завершення'}
          />
        </li> 
      </ul>

      <ul className={styles.list}>
         <li className={ styles.list_item }>
          <Select
            id={"isTeamRequired"}
            placeholder={'Оберіть стан'}
            className={styles.item}
            required={false}
            registerOptions={register("isTeamRequired", { ...ProjectScheme.isTeamRequired})}
            // onClick={()=>{setTooltip(null)}}
            isError={errors.isTeamRequired}
            isValid={isValid}
            version={"input_admin"}
            label={'Стан'}
          />
        </li> 

        <li className={ styles.list_item }>
          <InputDate
            id={"date"}
            className={styles.item}
            required={false}
            // registerOptions={register("date", { ...ReviewScheme.date})}
            // onClick={()=>{setTooltip(null)}}
            // isError={errors.date}
            // isValid={isValid}
            version={"input_admin"}
            label={'Дата завершення'}
          />
        </li> 

        {/* <li className={clsx(styles.list_item, styles.tooltip)}>
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
        </li>  */}

        {/* <li className={clsx(styles.list_item, styles.item_prev)}>
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
        </li> */}
      </ul>

      <ul className={styles.list}>
         <li className={ styles.list_item }>
            <InputField
              id={"deployUrl"}
              //maxLength={100}
              className={styles.item}
              required={false}
              placeholder={"Введіть адресу"}
              registerOptions={register("deployUrl", { ...ProjectScheme.deployUrl })}
              isError={errors.deployUrl}
              isValid={isValid}
              version={"input_admin"}
              label={'Адреса сайту'}
              //locale={'ua'}
            />
        </li> 

        <li className={clsx(styles.list_item )}>
          <InputFile
            id={"file"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrl }
            required={false}
            accept="image/*"
            placeholder={"Завантажте фото"}
            registerOptions={register("file", { ...ProjectScheme.file })}
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Фото'}
          />
        </li>
        <li className={ clsx(styles.list_item,styles.item_prev )}>
          <ImagePreview imageUrl={prevUrl} variant='review'/>
        </li>

        {/* <li className={clsx(styles.list_item, styles.tooltip)}>
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
        </li>  */}

        {/* <li className={clsx(styles.list_item, styles.item_prev)}>
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
        </li> */}
      </ul>
      
      <div className={styles.btns}>
        <MainButton
          type="submit"
          className={styles.btn}
          //disabled={isDisabled()}
        >
          {submitBtnText}
        </MainButton>

        <MainButton
          variant='admin'
          className={styles.btn_cancel}
          //onClick={()=>{resetForm()}}
        >
          {'Скасувати'}
        </MainButton>
      </div >
    </form>
  )
}