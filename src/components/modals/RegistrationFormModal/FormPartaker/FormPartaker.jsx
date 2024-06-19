"use client";
import { useState } from "react";
import styles from './FormPartaker.module.scss';
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { PartakerSchema, partakerDefaultValues } from "./formPartakeScheme";
import MainButton from "../../../shared/MainButton/MainButton";
import InputField from "../../../shared/InputField/InputField";
import { optionsSpec } from "./options";
import { Icon } from "@/src/components/shared/Icon/Icon";
import stateUseAlert from "@/src/state/stateUseAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/src/components/shared/loader/Loader";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";
import { createKey } from "@/src/lib/utils/createKey";


export default function FormPartaker() {
  const t = useTranslations("Modal_form");

  const open = stateUseAlert(state => state.open);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...partakerDefaultValues}, resolver: zodResolver(PartakerSchema), mode: 'onBlur'});

  const [ specialization, setSpecialization ] = useState('');
  const [ phone, setPhone ] = useState('');
  const[ experience, setExperience ] = useState('')

  const [ agree, setAgree ] = useState(false);
  const [loader, setIsLoader] = useState(false);

  const resetForm = () => {
    setSpecialization('')
    setPhone('')
    setExperience('')
    setAgree(false)
    setIsLoader(false)
    reset();
    handleClose()
  }
  const isSubmitted = (res) => {
    setIsLoader(false)
    if(res === 'error'){
      open('error')
    }
    open('success')
    resetForm()
  }

  const onSubmit = (data) => {
    setIsLoader(true)
    // Імітація відправки форми
    setTimeout(()=>{
      isSubmitted('success')
      console.log(data);
    },3000)
  };


  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   trigger,
  //   formState: { errors, isValid, isDirty },
  //   reset,
  // } = useForm({ defaultValues: { ...formScheme.defaultValues } });


  // const [ specialization, setSpecialization ] = useState('');
  // //const [ convenientTime, setConvenientTime ] = useState('');
  // const [ agree, setAgree ] = useState(false);

  // const onSubmit = (data) => {
  //   console.log(data);
  //   reset();
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_partaker}>
      <h2>{t("title")}</h2>

      <ul className={styles.list}>
        <li>
          <InputField
            id={"firstName"}
            className={styles.item}
            placeholder={t("firstName")}
            registerOptions={register("firstName", { ...PartakerSchema.firstName})}
            isError={errors.firstName}
            isValid={isValid}
            version={"input"}
            label={t("firstName")}
          />

          {errors.firstName && <p className={styles.error}>{t("error_message.firstName")}</p>}
        </li>

        <li>
          <InputField
            id={"lastName"}
            className={styles.item}
            placeholder={t("lastName")}
            registerOptions={register("lastName", { ...PartakerSchema.lastName})}
            isError={errors.lastName}
            isValid={isValid}
            version={"input"}
            label={t("lastName")}
          />

          {errors.lastName && <p className={styles.error}>{t("error_message.lastName")}</p>}
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
                  id={option.id} name="specialization" 
                  value={option.label} 
                  onClick={()=>{setSpecialization(option.label)}}/>
                    <span className={clsx(styles.check,specialization === option.label && styles._active)}>
                      <Icon name={'check'}/>
                    </span>
                    {option.label}
                  </label>
                )
              })}
            </div>
        
            {errors.specialization && <p className={clsx(styles.error, styles._list)}>{t("error_message.specialization")}</p>}
          </div>
        </li>

        <li>
          <InputField
            id={"email"}
            className={styles.item}
            placeholder={"email@gmail.com"}
            registerOptions={register("email", { ...PartakerSchema.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input"}
            label={t("email")}
          />
          {errors.email && <p className={styles.error}>{t("error_message.email")}</p>}
        </li>

        <li>
          <InputField
            id={"phone"}
            className={styles.item}
            placeholder={"+380 xx xxx xx xx"}
            value={phone}
            onFocus={()=>{setPhone(phone ? phone : '+380')}}
            onInput={(e)=>{setPhone(e.target.value)}}
            onChange={(e)=>{setPhone(formatPhoneNumber(e.target.value))}}
            registerOptions={register("phone", { ...PartakerSchema.phone })}
            isError={errors.phone}
            isValid={isValid}
            version={"input"}
            label={t("phone")}
          />
          {errors.phone && <p className={styles.error_modal}>{t(`error_message.${errors.phone.message}`)}</p>}
        </li>

        <li>
          <InputField
            id={"city"}
            className={styles.item}
            placeholder={t("city_placeholder")}
            registerOptions={register("city", { ...PartakerSchema.city })}
            isError={errors.city}
            isValid={isValid}
            version={"input"}
            label={t("city")}
          />
          {errors.city && <p className={styles.error}>{t("error_message.city")}</p>}
        </li>

        <li>
          <InputField
            id={"country"}
            className={styles.item}
            placeholder={t("country_placeholder")}
            registerOptions={register("country", { ...PartakerSchema.country })}
            isError={errors.country}
            isValid={isValid}
            version={"input"}
            label={t("country")}
          />
          {errors.country && <p className={styles.error}>{t("error_message.country")}</p>}
        </li>

        <li>
          <InputField
            id={"discord"}
            className={styles.item}
            placeholder={t("discord")}
            registerOptions={register("discord", { ...PartakerSchema.discord })}
            isError={errors.discord}
            isValid={isValid}
            version={"input"}
            label={t("discord")}
          />
          {errors.discord && <p className={styles.error}>{t("error_message.discord")}</p>}
        </li>
        <li>
          <InputField
            id={"linkedin"}
            className={styles.item}
            placeholder={t("linkedin_placeholder")}
            registerOptions={register("linkedin", { ...PartakerSchema.linkedin })}
            isError={errors.linkedin}
            isValid={isValid}
            version={"input"}
            label={t("linkedin")}
          />
          {errors.linkedin && <p className={styles.error}>{t("error_message.linkedin")}</p>}
        </li>
        <li>
          <div className={styles.item}>
            <h4>{t("experience")} <span>*</span></h4>
            <div className={styles.select_column}>
              <label htmlFor={'yes'} className={styles.btn_option}>
                <input 
                  type="radio" 
                    {...register("experience", { ...PartakerSchema.experience })}
                    id={'yes'} name="experience" 
                    value={t("yes")} 
                    onClick={()=>{setExperience('yes')}}/>
                      <span className={clsx(styles.check, experience==='yes' && styles._active)}>
                        <Icon name={'check'}/>
                      </span>
                      {t("yes")}
              </label>
              <label htmlFor={'no'} className={styles.btn_option}>
                <input 
                  type="radio" 
                    {...register("experience", { ...PartakerSchema.experience })}
                    id={'no'} name="experience" 
                    value={t("no")} 
                    onClick={()=>{setExperience('no')}}/>
                      <span className={clsx(styles.check, experience==='no' && styles._active)}>
                        <Icon name={'check'}/>
                      </span>
                      {t("no")}
              </label>
            </div>
        
            {errors.experience && <p className={clsx(styles.error, styles._list)}>{t("error_message.experience")}</p>}
          </div>
        </li>
        {/* <li>
          <div className={styles.item}>
            <h4>{t("convenient_time")} <span>*</span></h4>
            <div className={styles.select}>
              {optionsTime.map((option)=>{
                return(
                  <label htmlFor={option.id} className={clsx(styles.btn_option,styles[option.id])} key={option.id}>
                  <input
                  type="radio" 
                  {...register("convenient_time", { ...formScheme.convenient_time })}
                  id={option.id} 
                  name="convenient_time" 
                  value={option.label} 
                  onClick={()=>{setConvenientTime(option.label)}}/>
                    <span className={clsx(styles.check, convenientTime === option.label && styles._active)}>
                      <Icon name={'check'}/>
                    </span>
                    {option.label=== "anytime"? t("anytime"):option.label}
                  </label>
                )
              })}
            </div>
            
            {errors.convenient_time && <span className={clsx(styles.error,styles._list, styles._hide)}>{t("error_message.convenient_time")}</span>}
          </div>

        </li> */}
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
                onClick={(e)=>{setAgree(e.target.checked)}}
              ></input>
              <span className={clsx(styles.check, agree && styles._active)}>
                <Icon name={'check'}/>
                </span>

              { t("permit")}
            </label>

            {errors.agree && <p className={clsx(styles.error, styles._list)}>{t("error_message.permit")}</p>}
          </div>
        </li>
          {/* {inputFields.map((field) => (
            <div key={field.id}>
              <InputField {...field} />
              {field.isError && <p>{t(`error_message.${field.id}`)}</p>}
            </div>
          ))} */}
      </ul>

      <MainButton
        type="submit"
        // disabled={!isDirty || !isValid}
        className={styles.submit}
      >
        {t("btn_send")}
      </MainButton>

      {loader && <Loader/>}
    </form>
  )
}