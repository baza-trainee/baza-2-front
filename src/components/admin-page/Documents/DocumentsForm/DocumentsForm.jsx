'use client';
import styles from './DocumentsForm.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/src/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/src/components/shared/inputs/InputField/InputField'
import InputFile from '@/src/components/shared/inputs/InputFile/InputFile';
import TextArea from '@/src/components/shared/inputs/TextArea/TextArea';
import MainButton from '@/src/components/shared/MainButton/MainButton'
//import { ReviewScheme } from './ReviewScheme';
import InputDate from '@/src/components/shared/inputs/InputDate/InputDate';
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData';
import ImagePreview from '../../ImagePreview/ImagePreview';
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';
import { documentsDefaultValues, documentsScheme } from './documentsFormScheme';
import { Icon } from '@/src/components/shared/Icon/Icon';
import ModalDocumentPdf from '@/src/components/modals/ModalDocumentPdf/ModalDocumentPdf';
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';

export default function DocumentsForm({data, hendleMutate, submitBtnText='Зберегти зміни', hendleSetPrev}){

  const[ prevUrlReport, setPrevUrlReport ] = useState(null)
  const[ prevUrlStatute, setPrevUrlStatute ] = useState(null)
  const[ prevUrlPrivacyPolicy, setPrevUrlPrivacyPolicy ] = useState(null)
  const[ prevUrlTermsOfUse, setPrevUrlTermsOfUse ] = useState(null)
  const[ prevUrlRules, setPrevUrlRules ] = useState(null)

  const open = stateModalDocumentPdf(state => state.open);


  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isError, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm({ defaultValues: {...documentsDefaultValues}, resolver: zodResolver(documentsScheme), mode: 'onChange'});

  const resetForm = () => {
    setPrevUrlReport(null)
    setPrevUrlStatute(null)
    setPrevUrlPrivacyPolicy(null)
    setPrevUrlTermsOfUse(null)
    setPrevUrlRules(null)
    reset();
  }

  useEffect(()=>{
    if(data){
      const{report, statute, privacyPolicy, termsOfUse, rules } = data
      setValue('report', '')
      setValue('statute', '')
      setValue('privacy_policy', '')
      setValue('terms_of_use', '')
      setValue('rules', '')

      setPrevUrlReport(report ? report : '')
      setPrevUrlStatute(statute ? statute : '')
      setPrevUrlPrivacyPolicy(privacyPolicy.ua ? privacyPolicy.ua : '')
      setPrevUrlTermsOfUse(termsOfUse.ua ? termsOfUse.ua : '')
      setPrevUrlRules(statute ? statute : '')
    }
  },[data])

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

  console.log(newData)
    //hendleMutate(newData)
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
          <MainButton  variant='admin' className={styles.placeholder} onClick={()=>{
            if(prevUrlPrivacyPolicy){
              hendleSetPrev(prevUrlPrivacyPolicy)
              open()
            }
            
            }} disabled={!prevUrlPrivacyPolicy}>
            <Icon className={styles.svg} name={'pdf-placeholder'}/>
            <Icon className={styles.icon_screen} name={'full_screen'} width={30} height={30}/>
          </MainButton>
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
          <MainButton  variant='admin' className={styles.placeholder} onClick={()=>{
            if(prevUrlTermsOfUse){
              hendleSetPrev(prevUrlTermsOfUse)
              open()
            }
            
            }} disabled={!prevUrlTermsOfUse}>
            <Icon className={styles.svg} name={'pdf-placeholder'}/>
            <Icon className={styles.icon_screen} name={'full_screen'} width={30} height={30}/>
          </MainButton>
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
          <MainButton  variant='admin' className={styles.placeholder} onClick={()=>{
            if(prevUrlStatute){
              hendleSetPrev(prevUrlStatute)
              open()
            }
            
            }} disabled={!prevUrlStatute}>
            <Icon className={styles.svg} name={'pdf-placeholder'}/>
            <Icon className={styles.icon_screen} name={'full_screen'} width={30} height={30}/>
          </MainButton>
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
          <MainButton  variant='admin' className={styles.placeholder} onClick={()=>{
            if(prevUrlReport){
              hendleSetPrev(prevUrlReport)
              open()
            }
            
            }} disabled={!prevUrlReport}>
            <Icon className={styles.svg} name={'pdf-placeholder'}/>
            <Icon className={styles.icon_screen} name={'full_screen'} width={30} height={30}/>
          </MainButton>
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
          <MainButton  variant='admin' className={styles.placeholder} onClick={()=>{
            if(prevUrlRules){
              hendleSetPrev(prevUrlRules)
              open()
            }
            
            }} disabled={!prevUrlRules}>
            <Icon className={styles.svg} name={'pdf-placeholder'}/>
            <Icon className={styles.icon_screen} name={'full_screen'} width={30} height={30}/>
          </MainButton>
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


// export default function DocumentsForm({data, handleMutate}) {
//   return(
//     <div>documentsFormScheme</div>
//   )
// }