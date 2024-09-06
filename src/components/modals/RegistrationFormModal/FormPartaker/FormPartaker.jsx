"use client";
import styles from './FormPartaker.module.scss';
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartakerSchema, partakerDefaultValues } from "./formPartakeScheme";
import { useMutation } from '@tanstack/react-query';
import { PartakerFormService } from '@/src/api/contact-form';
import MainButton from "../../../shared/MainButton/MainButton";
import InputField from "../../../shared/inputs/InputField/InputField";
import { optionsQuestionnaire, optionsSpec } from "./options";
import { Icon } from "@/src/components/shared/Icon/Icon";
import stateUseAlert from "@/src/state/stateUseAlert";
import Loader from "@/src/components/shared/loader/Loader";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";
import { createKey } from "@/src/lib/utils/createKey";
import stateModalDocumentPdf from "@/src/state/stateModalDocumentPdf";
import TooltipText from "../../../shared/TooltipText/TooltipText";

export default function FormPartaker({handleClose}) {
  const t = useTranslations("Modal_form");
  const openPdf = stateModalDocumentPdf(state => state.open);
  const open = stateUseAlert(state => state.open);

  const {
    register,
    handleSubmit,
    formState: {  errors, isValid, isDirty },
    reset
  } = useForm({ 
    defaultValues: {...partakerDefaultValues}, 
    resolver: zodResolver(PartakerSchema), 
    mode: 'onBlur'
  });

  const [ specialization, setSpecialization ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ experience, setExperience ] = useState('')
  const [ questionnaire, setQuestionnaire ] = useState('')
  
  const [ conditions, setConditions ] = useState(false);
  const [ agree, setAgree ] = useState(false);

  const resetForm = () => {
    setSpecialization('')
    setPhone('')
    setExperience('')
    setQuestionnaire('')
    setConditions(false)
    setAgree(false)
    reset();
    handleClose()
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return PartakerFormService(data)
    },
    onSuccess:()=>{
      open('success')
      resetForm()
    },
    onError: () => {
      open('error')
    },
  })

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else if (isDirty && !isValid) {
      return true;
    } else return false;
  };

  // Валідація символів номеру телефону
  const inputValidPhone = (event) =>{
    setPhone(formatPhoneNumber(event.target.value))
  };

  return (
    <form onSubmit={handleSubmit(mutate)} className={styles.form_partaker}>
      <h2>{t("title")}</h2>

      <ul className={styles.list}>
        <li>
          <InputField
            id={"firstName"}
            maxLength={35}
            className={styles.item}
            placeholder={t("firstName")}
            registerOptions={register("firstName", { ...PartakerSchema.firstName})}
            isError={errors.firstName}
            errorMessage={errors.firstName && t(`error_message.${errors.firstName.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("firstName")}
          />
        </li>

        <li>
          <InputField
            id={"lastName"}
            maxLength={55}
            className={styles.item}
            placeholder={t("lastName")}
            registerOptions={register("lastName", { ...PartakerSchema.lastName})}
            isError={errors.lastName}
            errorMessage={errors.lastName && t(`error_message.${errors.lastName.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("lastName")}
          />
        </li>

        <li>
          <div className={styles.item}>
            <h4>{t("specialization")} <span>*</span></h4>
            <div className={styles.select}>
              {optionsSpec.map((option)=>{
                return(
                  <label htmlFor={option.id} className={styles.btn_option} key={createKey()}>
                  <input 
                  type="radio" 
                  {...register("specialization", { ...PartakerSchema.specialization })}
                  id={option.id} 
                  name="specialization" 
                  value={option.label} 
                  onClick={()=>{setSpecialization(option.label)}}/>
                    <span className={clsx(styles.check, specialization === option.label && styles._active)}>
                      <Icon name={'check'}/>
                    </span>
                    {option.label}
                  </label>
                )
              })}
            </div>
        
            {errors.specialization && <p className={clsx(styles.error_partaker, styles._list)}>{t("error_message.specialization")}</p>}
          </div>
        </li>

        <li>
          <InputField
            id={"email"}
            maxLength={55}
            type='email'
            className={styles.item}
            placeholder={"email@gmail.com"}
            registerOptions={register("email", { ...PartakerSchema.email })}
            isError={errors.email}
            errorMessage={errors.email && t(`error_message.${errors.email.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("email")}
          />
        </li>

        <li>
          <InputField
            id={"phone"}
            maxLength={20}
            className={styles.item}
            placeholder={"+380 xx xxx xx xx"}
            type='tel'
            value={phone}
            onFocus={()=>{setPhone(phone ? phone : '+380')}}
            onInput={(e)=>{inputValidPhone(e)}}
            registerOptions={register("phone", { ...PartakerSchema.phone })}
            isError={errors.phone}
            errorMessage={errors.phone && t(`error_message.${errors.phone.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("phone")}
          />
        </li>

        <li>
          <InputField
            id={"city"}
            maxLength={35}
            required={false}
            className={styles.item}
            placeholder={t("city_placeholder")}
            registerOptions={register("city", { ...PartakerSchema.city })}
            isError={errors.city}
            errorMessage={errors.city && t(`error_message.${errors.city.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("city")}
          />
        </li>

        <li>
          <InputField
            id={"country"}
            maxLength={35}
            required={false}
            className={styles.item}
            placeholder={t("country_placeholder")}
            registerOptions={register("country", { ...PartakerSchema.country })}
            isError={errors.country}
            errorMessage={errors.country && t(`error_message.${errors.country.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("country")}
          />
        </li>

        <li className={styles.tooltip}>
          <InputField
            id={"discord"}
            maxLength={35}
            className={styles.item}
            placeholder={t("discord")}
            registerOptions={register("discord", { ...PartakerSchema.discord })}
            isError={errors.discord}
            errorMessage={errors.discord && t(`error_message.${errors.discord.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("discord")}
          />

          <TooltipText className={styles._active}/>
        </li>

        <li>
          <InputField
            id={"linkedin"}
            maxLength={200}
            className={styles.item}
            placeholder={t("linkedin_placeholder")}
            registerOptions={register("linkedin", { ...PartakerSchema.linkedin })}
            isError={errors.linkedin}
            errorMessage={errors.linkedin && t(`error_message.${errors.linkedin.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("linkedin")}
          />
        </li>

        <li>
          <div className={styles.item}>
            <h4>{t("experience")} <span>*</span></h4>
            <div className={styles.select_column}>
              <label htmlFor={'yes'} className={styles.btn_option}>
                <input 
                  type="radio" 
                  {...register("experience", { ...PartakerSchema.experience })}
                  id={'yes'} name= "experience" 
                  value={'true'} 
                  onClick={()=>{setExperience('yes')}}/>
                  <span className={clsx(styles.check, experience === 'yes' && styles._active)}>
                    <Icon name={'check'}/>
                  </span>
                  {t("yes")}
              </label>
              <label htmlFor={'no'} className={styles.btn_option}>
                <input 
                  type="radio" 
                  {...register("experience", { ...PartakerSchema.experience })}
                  id={'no'} 
                  name="experience" 
                  value={'false'} 
                  onClick={()=>{setExperience('no')}}/>
                  <span className={clsx(styles.check, experience === 'no' && styles._active)}>
                    <Icon name={'check'}/>
                  </span>
                  {t("no")}
              </label>
            </div>
        
            {errors.experience && <p className={clsx(styles.error_partaker, styles._list)}>{t(`error_message.${errors.experience.message}`)}</p>}
          </div>
        </li>

        <li>
          <InputField
            id={"motivation"}
            maxLength={55}
            className={styles.item}
            placeholder={t("your_answer")}
            registerOptions={register("motivation", { ...PartakerSchema.motivation})}
            isError={errors.motivation}
            errorMessage={errors.motivation && t(`error_message.${errors.motivation.message}`)}
            isValid={isValid}
            version={"input"}
            label={t("motivation")}
          />
        </li>

        <li>
          <div className={styles.item}>
            <h4>{t("saw_questionnaire")} <span>*</span></h4>
            <div className={styles.select_column}>
              {optionsQuestionnaire.map((option)=>{
                return(
                  <label htmlFor={option.id} className={styles.btn_option} key={createKey()}>
                  <input 
                  type="radio" 
                  {...register("sawQuestionnaire", { ...PartakerSchema.sawQuestionnaire })}
                  id={option.id} name="sawQuestionnaire" 
                  value={t(option.id)} 
                  onClick={()=>{setQuestionnaire(t(option.id))}}/>
                    <span className={clsx(styles.check, questionnaire === t(option.id) && styles._active)}>
                      <Icon name={'check'}/>
                    </span>
                    {t(option.id)}
                  </label>
                )
              })}
            </div>
        
            {errors.sawQuestionnaire && <p className={clsx(styles.error_partaker, styles._list)}>{t("error_message.saw_questionnaire")}</p>}
          </div>
        </li>

        <li>
          <div className={styles.item}>
            <h4>{t("rules_participation")}</h4>
            <button 
              className={styles.linck} 
              onClick={ ()=>{openPdf('rules')} }
              type="button">{t('read_here')}</button>
          </div>
        </li>

        <li>
          <div className={styles.item}>
            <h4>{t("acquainted")} <span>*</span></h4>
            <label
              htmlFor={'acquainted'}
              className={clsx(styles.btn_option, styles.agree)}
            >
              <input
                id={'acquainted'}
                type="checkbox"
                {...register("agree_conditions", { ...PartakerSchema.agree_conditions })}
                checked={conditions}
                onClick={(e)=>{setConditions(e.target.checked)}}
              ></input>
              <span className={clsx(styles.check, conditions && styles._active)}>
                <Icon name={'check'}/>
                </span>

              { t("agree")}
            </label>

            {errors.agree_conditions && <p className={styles.error_partaker}>{t("error_message.agree")}</p>}
          </div>
        </li>

        <li>
          <div className={styles.item}>
            <label
              htmlFor={'agree'}
              className={clsx(styles.btn_option, styles.agree)}
            >
              <input
                id={'agree'}
                type="checkbox"
                {...register("agree", { ...PartakerSchema.agree })}
                checked={agree}
                onClick={(e)=>{setAgree(e.target.checked)}}
              ></input>
              <span className={clsx(styles.check, agree && styles._active)}>
                <Icon name={'check'}/>
                </span>

              { t("permit")}
            </label>

            {errors.agree && <p className={styles.error_partaker}>{t("error_message.permit")}</p>}
          </div>
        </li>
      </ul>

      <MainButton
        type="submit"
        disabled={isDisabled()}
        className={styles.submit}
      >
        {t("btn_send")}
      </MainButton>

      {isPending && <Loader/>}
    </form>
  )
}