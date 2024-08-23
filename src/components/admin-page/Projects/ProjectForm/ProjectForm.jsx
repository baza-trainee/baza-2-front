import styles from './ProjectForm.module.scss'
import clsx from 'clsx'

import { useProjectFormContext } from '../ProjectFormProvider/ProjectFormProvider'
import { ProjectScheme } from '../ProjectFormProvider/projectFormScheme'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate'
import Select from '../Select/Select'
import InputComplexity from '../InputComplexity/InputComplexity'
import ImagePreview from '../../ImagePreview/ImagePreview'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile'

export default function ProjectForm( {submitBtnText}) {
  // Контекст форми
  const{ 
    onSubmit, 
    errors, 
    isValid, 
    control, 
    register,
    trigger,
    setValue,
    getValues, 
    isError,
    isDirty,
    prevUrl, 
    setPrevUrl, 
    resetForm} = useProjectFormContext()

  // Стан кнопки submit
  const isDisabled = () => {
    if (isError) {
      return true;
    }
    else if(!isValid){
      return true
    }
    else return false
  }

 // Стан проєкту
  const isDoneProject=()=>{
    if(getValues("isTeamRequired") === 'done'){
      return false
    }else{ 
      setValue("launchDate",'')
      return true
    }
  }

  return(
    <form className={styles.form} onSubmit={onSubmit} autoComplete='of'>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item)}>
         <InputField
            id={"title_ua"}
            control={control}
            maxLength={102}
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
            control={control}
            maxLength={102}
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
            control={control}
            maxLength={102}
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
            control={control}
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
            control={control}
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
            value={getValues("isTeamRequired")}
            setValueStateProject={setValue}
            target={trigger}
            isValid={isValid}
            isError={errors.isTeamRequired}
            label={'Стан'}
          />
        </li> 

        <li className={ styles.list_item }>
          <InputComplexity
            className={styles.item}
            required={false}
            value={getValues("complexity")}
            setValue={setValue}
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
            control={control}
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
            control={control}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrl }
            required={false}
            accept="image/*"
            placeholder={ prevUrl ? prevUrl: "Завантажте зображення"}
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