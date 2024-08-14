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
import Select from '@/src/components/admin-page/Projects/Description/DescriptionForm/Select/Select';
import InputComplexity from './InputComplexity/InputComplexity';



export default function DescriptionForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Додати'
}) {
  // const router = useRoute();

 const[ prevUrl, setPrevUrl ] = useState(null)
 const [ valueStateProject, setValueStateProject ] = useState('teamFormation');
 const[ complexity, setComplexity ] = useState(0)
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
  } = useForm({ defaultValues: {...ProjectDefaultValues}, resolver: zodResolver(ProjectScheme), mode: 'onChange'});

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
      title:{
        en: data.title_en,
        pl: data.title_pl,
        ua: data.title_ua,
      },
      file: data.file,
      isTeamRequired: valueStateProject === 'teamFormation',
      creationDate: data.creationDate,
      complexity: complexity
    }
    
    if(data.deployUrl){ newData.deployUrl = data.deployUrl }

    if(data.launchDate){ newData.launchDate = data.launchDate }

    if(data.teamMembers){ newData.teamMembers = data.teamMembers }

    console.log(newData)
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
//  const hendlrSetValue=(value)=>{
//   setValue("isTeamRequired",value)
//  }
  const isDoneProject=()=>{
    if(valueStateProject === 'done'){
      return false
    }else return true
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
            disabled={isDoneProject()}
            className={styles.item}
            required={false}
            registerOptions={register("launchDate", { ...ProjectScheme.launchDate})}
            isError={errors.launchDate}
            isValid={!isDoneProject() && isValid}
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
            value={valueStateProject}
            setValueStateProject={setValueStateProject}
            isValid={isValid}
            label={'Стан'}
          />
        </li> 

        <li className={ styles.list_item }>
          <InputComplexity
            id={"complexity"}
            className={styles.item}
            required={false}
            value={complexity}
            setValue={setComplexity}
            isValid={isValid}
            label={'Складність проєкту'}
          />
        </li> 
      </ul>

      <ul className={styles.list}>
         <li className={ styles.list_item }>
            <InputField
              id={"deployUrl"}
              className={styles.item}
              required={false}
              placeholder={"Введіть адресу"}
              registerOptions={register("deployUrl", { ...ProjectScheme.deployUrl })}
              isError={errors.deployUrl}
              isValid={isValid}
              version={"input_admin"}
              label={'Адреса сайту'}
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
            placeholder={"Завантажте зображення"}
            registerOptions={register("file", { ...ProjectScheme.file })}
            isDirty={isDirty}
            isError={errors.file}
            isValid={isValid}
            version={"file"}
            label={'Обкладинка'}
          />
        </li>
        <li className={ clsx(styles.list_item,styles.item_prev )}>
          <ImagePreview imageUrl={prevUrl} variant='review'/>
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
          //onClick={()=>{resetForm()}}
        >
          {'Скасувати'}
        </MainButton>
      </div >
    </form>
  )
}