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
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate';
import { formatDateToNumeric } from '@/src/lib/utils/formatData';

export default function ReviewForm({
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


  //const date = Date.now();
  console.log(valueDate)

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
      //setValue('date',new Date(date))
      setValueDate(date)
      setValue('file', '')
      setPrevUrl(imageUrl)
    }
  },[data])

  const onSubmit = (data) => {
    console.log(data)
    // const newData = {
    //   title: {
    //     en: data.title_en,
    //     pl: data.title_pl,
    //     ua: data.title_ua
    //   },
    //   subtitle: {
    //     en: data.text_en,
    //     pl: data.text_pl,
    //     ua: data.text_ua
    //   },
    //   file: data.file[0],
    // }
    //hendleMutate(newData)
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
            id={"name_ua"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Ім’я"}
            registerOptions={register("name_ua", { ...ReviewScheme.name_ua })}
            isError={errors.name_ua}
            isValid={isValid}
            version={"input_admin"}
            label={'Ім’я'}
            locale={'ua'}
          />
        </li>

        <li className={clsx(styles.list_item, styles.grid_item4)}>
          <InputField
            id={"name_en"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Name"}
            registerOptions={register("name_en", { ...ReviewScheme.name_en })}
            isError={errors.name_en}
            isValid={isValid}
            version={"input_admin"}
            label={'Ім’я'}
            locale={'en'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.grid_item5)}>
          <InputField
            id={"name_pl"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Imię"}
            registerOptions={register("name_pl", { ...ReviewScheme.name_pl})}
            isError={errors.name_pl}
            isValid={isValid}
            version={"input_admin"}
            label={'Ім’я'}
            locale={'pl'}
          />
        </li> 

        <li className={clsx(styles.list_item, styles.grid_item5)}>
          <InputField
            id={"role"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Введіть дані"}
            registerOptions={register("role", { ...ReviewScheme.role})}
            isError={errors.role}
            isValid={isValid}
            version={"input_admin"}
            label={'Спеціалізація'}
          />
        </li> 
        <li className={clsx(styles.list_item, styles.grid_item5)}>
        
          <InputDate
            id={"date"}
            //maxLength={100}
            className={styles.item}
            required={false}
            //placeholder={"Введіть дату"}
            registerOptions={register("date", { ...ReviewScheme.date})}
            onInput={(e)=>{setValueDate(e.target.valueAsNumber)}}
            isError={errors.date}
            isValid={isValid}
            version={"input_admin"}
            label={'Дата'}
            //iconName={'calendar_dark'}
          />
          <span>{valueDate}</span>
          {/* <InputField
            id={"date"}
            maxLength={100}
            className={styles.item}
            required={false}
            placeholder={"Введіть дату"}
            registerOptions={register("date", { ...ReviewScheme.date})}
            isError={errors.date}
            isValid={isValid}
            version={"input_admin"}
            label={'Дата'}
            iconName={'calendar_dark'}
          /> */}
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
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Фото'}
          />
            <ReviewPreview imageUrl={prevUrl}/>
        </li>

        <li className={clsx(styles.list_item)}>
          <TextArea 
            id={"text_ua"}   
            className={styles.item_text} 
            isError={errors.text_ua}
            isValid={isValid}
            registerOptions={register("text_ua", { ...ReviewScheme.text_ua })}
            required={false}
            placeholder={"Текст"} 
            label={'Текст'} 
            locale={'ua'}/>
        </li>

        <li className={clsx(styles.list_item)}>
          <TextArea 
            id={"text_en"}   
            className={styles.item_text} 
            isError={errors.text_en}
            isValid={isValid}
            registerOptions={register("text_en", { ...ReviewScheme.text_en })}
            required={false}
            placeholder={"Текст"} 
            locale={'en'}/>
        </li>
        <li className={clsx(styles.list_item)}>
          <TextArea 
            id={"text_pl"}   
            className={styles.item_text} 
            isError={errors.text_pl}
            isValid={isValid}
            registerOptions={register("text_pl", { ...ReviewScheme.text_pl })}
            required={false}
            placeholder={"Текст"}  
            locale={'pl'}/>
        </li>
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
          onClick={()=>{resetForm()}}
        >
          {'Скасувати'}
        </MainButton>
      </div >
    </form>
  )
}