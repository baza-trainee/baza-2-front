'use client';
import styles from './DocumentsForm.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { documentsDefaultValues, documentsScheme } from './documentsFormScheme';
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import MainButton from '@/src/components/shared/MainButton/MainButton'
import PrevDocumentButton from '../PrevDocumentButton/PrevDocumentButton';

export default function DocumentsForm({
  data, 
  hendleMutate, 
  submitBtnText='Зберегти зміни', 
  hendleSetPrev, 
  isSuccess
}){

  const router = useRouter();
  // Стан попереднього перегляду
  const[ prevUrlReport, setPrevUrlReport ] = useState(null)
  const[ prevUrlStatute, setPrevUrlStatute ] = useState(null)
  const[ prevUrlPrivacyPolicy, setPrevUrlPrivacyPolicy ] = useState(null)
  const[ prevUrlTermsOfUse, setPrevUrlTermsOfUse ] = useState(null)
  const[ prevUrlRules, setPrevUrlRules ] = useState(null)

  // Керування формою useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
  } = useForm({ 
    defaultValues: {...documentsDefaultValues}, 
    resolver: zodResolver(documentsScheme), 
    mode: 'onChange'
  });

  // Функція очищення форми
  const resetForm = () => {
    setPrevUrlReport(null)
    setPrevUrlStatute(null)
    setPrevUrlPrivacyPolicy(null)
    setPrevUrlTermsOfUse(null)
    setPrevUrlRules(null)
    reset();
  }
 // Заповнення форми данними для редагування
  useEffect(()=>{
    if(isSuccess){
      resetForm()
    }

    if(data){
      const{report, statute, privacyPolicy, termsOfUse, rules } = data
      console.log(privacyPolicy.ua)
      setValue('report', report ? '' : null)
      setValue('statute', statute ? '' : null)
      setValue('privacy_policy',privacyPolicy.ua ? '' : null)
      setValue('terms_of_use', termsOfUse.ua ? '' : null)
      setValue('rules', report ? '' : null)

      setPrevUrlReport(report ? report : '')
      setPrevUrlStatute(statute ? statute : '')
      setPrevUrlPrivacyPolicy(privacyPolicy.ua ? privacyPolicy.ua : '')
      setPrevUrlTermsOfUse(termsOfUse.ua ? termsOfUse.ua : '')
      setPrevUrlRules(rules ? rules : '')
    }
  },[data, isSuccess])

  // Функція підготовки данних для відправки
  const onSubmit = (data) => {
    const newData = {
      privacyPolicy: {
      },
      termsOfUse: {
      },
    }

    if(data.report){newData.report = data.report}
    if(data.statute){newData.statute = data.statute}
    if(data.privacy_policy){newData.privacyPolicy.ua = data.privacy_policy}
    if(data.terms_of_use){newData.termsOfUse.ua = data.terms_of_use}
    if(data.rules){newData.rules = data.rules}

    hendleMutate(newData)
  };
  // Блокування кнопки відправки
  const isDisabled = () => {
    if (isError) {
      return true;
    }else if(!isDirty){
      return true
    }
    else if(!isValid){
      return true
    }
    else return false
  }

  return(
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.item_prev)}>
          <InputFile
            id={"privacy_policy"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrlPrivacyPolicy }
            required={false}
            accept="application/pdf"
            placeholder={ prevUrlPrivacyPolicy? prevUrlPrivacyPolicy: "Завантажте документ"}
            registerOptions={register("privacy_policy", { ...documentsScheme.privacy_policy })}
            fileType={'PDF'}
            isDirty={isDirty}
            isError={errors.privacy_policy}
            isValid={isValid}
            version={"file"}
            label={'Політика конфіденційності'}
          />
        </li>
        <li className={clsx(styles.list_item)}>
          <PrevDocumentButton 
            prevUrl={prevUrlPrivacyPolicy} 
            hendleSetPrev={hendleSetPrev}/>
        </li>
      </ul>

      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.item_prev)}>
          <InputFile
            id={"terms_of_use"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrlTermsOfUse }
            required={false}
            accept="application/pdf"
            placeholder={ prevUrlTermsOfUse ? prevUrlTermsOfUse: "Завантажте документ"}
            registerOptions={register("terms_of_use", { ...documentsScheme.terms_of_use })}
            fileType={'PDF'}
            isDirty={isDirty}
            isError={errors.terms_of_use}
            isValid={isValid}
            version={"file"}
            label={'Правила користування сайтом'}
          />
           
        </li>
        <li className={clsx(styles.list_item)}>
          <PrevDocumentButton 
            prevUrl={prevUrlTermsOfUse} 
            hendleSetPrev={hendleSetPrev}/>
        </li>
      </ul>

      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.item_prev)}>
          <InputFile
            id={"statute"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrlStatute }
            required={false}
            accept="application/pdf"
            placeholder={ prevUrlStatute ? prevUrlStatute : "Завантажте документ"}
            registerOptions={register("statute", { ...documentsScheme.statute })}
            fileType={'PDF'}
            isDirty={isDirty}
            isError={errors.statute}
            isValid={isValid}
            version={"file"}
            label={'Статут'}
          />
        </li>
        <li className={clsx(styles.list_item)}>
          <PrevDocumentButton 
            prevUrl={prevUrlStatute} 
            hendleSetPrev={hendleSetPrev}/>
        </li>
      </ul>

      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.item_prev)}>
          <InputFile
            id={"report"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrlReport }
            required={false}
            accept="application/pdf"
            placeholder={ prevUrlReport ? prevUrlReport: "Завантажте документ"}
            registerOptions={register("report", { ...documentsScheme.report })}
            fileType={'PDF'}
            isDirty={isDirty}
            isError={errors.report}
            isValid={isValid}
            version={"file"}
            label={'Звітність'}
          />
        </li>
        <li className={clsx(styles.list_item)}>
          <PrevDocumentButton 
            prevUrl={prevUrlReport} 
            hendleSetPrev={hendleSetPrev}/>
        </li>
      </ul>

      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.item_prev)}>
          <InputFile
            id={"rules"}
            className={styles.item}
            type={'file'}
            getPrevImgUrl={ setPrevUrlRules }
            required={false}
            accept="application/pdf"
            placeholder={ prevUrlRules ? prevUrlRules : "Завантажте документ"}
            registerOptions={register("rules", { ...documentsScheme.rules })}
            fileType={'PDF'}
            isDirty={isDirty}
            isError={errors.rules}
            isValid={isValid}
            version={"file"}
            label={'Правила участі'}
          />
        </li>
        <li className={clsx(styles.list_item)}>
          <PrevDocumentButton 
            prevUrl={prevUrlRules} 
            hendleSetPrev={hendleSetPrev}/>
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
          onClick={()=>{router.replace('/admin')}}
        >
          {'Скасувати'}
        </MainButton>
      </div >
    </form>
  )
}