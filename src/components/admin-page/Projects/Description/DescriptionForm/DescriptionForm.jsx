'use client';
import clsx from 'clsx'
import styles from './DescriptionForm.module.scss'
import { useEffect, useState } from 'react'
import { useRouter } from '@/src/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectDefaultValues, ProjectScheme } from './descriptionFormScheme';
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate'
import ImagePreview from '../../../ImagePreview/ImagePreview'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile'
import InputComplexity from './InputComplexity/InputComplexity';
import Select from './Select/Select';

export default function DescriptionForm({
  hendleMutate, 
  isSuccess, 
  data, 
  submitBtnText= 'Додати'
}) {
  const router = useRouter();

  const[ prevUrl, setPrevUrl ] = useState(null)
  const [ valueStateProject, setValueStateProject ] = useState('teamFormation');
  const[ complexity, setComplexity ] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm({ defaultValues: {...ProjectDefaultValues}, resolver: zodResolver(ProjectScheme), mode: 'onChange'});

  const hendleSetValue =(value)=>{
    setValueStateProject(value)
    setValue('isTeamRequired', value)
    trigger("launchDate")
  }

  const resetForm = () => {
    router.replace('/admin/projects')
    reset();
  }

  // useEffect(()=>{
  //   if(isSuccess){
  //     reset();
  //   }
  // },[isSuccess])


  const getStatusName=(isTeamRequired, launchDate)=>{
    if(isTeamRequired){ return 'teamFormation' }
    if(launchDate){ return 'done' }
    return 'inDevelopment'
  }

  useEffect(()=>{
    if(data){
      const{title, imageUrl, isTeamRequired, creationDate, launchDate,   complexity, deployUrl} = data
      setValue('title_ua',title.ua )
      setValue('title_en',title.en )
      setValue('title_pl',title.pl )
      setPrevUrl(imageUrl)

      setValue('isTeamRequired',  getStatusName(isTeamRequired, launchDate))
      setValue('deployUrl', deployUrl)
      setValueStateProject(getStatusName(isTeamRequired, launchDate))
      setValue('creationDate',formatDateToNumericInputDate({timestamp:creationDate}))
      setValue('launchDate',launchDate ? formatDateToNumericInputDate({timestamp:launchDate}):'')

      setComplexity(complexity)
      setValue('file', '')
      trigger('isTeamRequired')
    }else {
      setValue('creationDate',formatDateToNumericInputDate({timestamp:Date.now()}))
    }
    
  },[data])

  const onSubmit = (data) => {
    const newData = {
      title:{
        en: data.title_en,
        pl: data.title_pl,
        ua: data.title_ua,
      },
      
      isTeamRequired: data.isTeamRequired === 'teamFormation',
      creationDate: data.creationDate,
      complexity: complexity,
    }
    if(data.file){newData.file = data.file}
    if(data.deployUrl){ newData.deployUrl = data.deployUrl }

    if(data.launchDate){ newData.launchDate = formatDateToNumericInputDate({dateString:data.launchDate})}else newData.launchDate = 0

    if(data.teamMembers){ newData.teamMembers = data.teamMembers }

   // console.log(newData)
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

  const isDoneProject=()=>{
    if(getValues("isTeamRequired") === 'done'){
      return false
    }else{ 
      setValue("launchDate",'')
      return true
    }
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
            value={valueStateProject}

            registerOptions={register("isTeamRequired", { ...ProjectScheme.isTeamRequired})}
            setValueStateProject={hendleSetValue}
            isValid={isValid}
            isError={errors.isTeamRequired}
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
          <ImagePreview imageUrl={prevUrl} variant='project'/>
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