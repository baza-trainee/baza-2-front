import styles from "./ContactForm.module.scss";
import { useTranslations } from "next-intl";
import MainButton from "../../shared/MainButton/MainButton";

export default function ContactForm() {
  const t = useTranslations("Main.feedback_form");
  return (
    <form className={styles.form}>
      <div>
        <label>name</label>
        <input type="text"/>
      </div>
      <MainButton type="submit">{t("btn_send")}</MainButton>
    </form>
  )
}

// import { useForm } from "react-hook-form"


// export default function App() {
//   const { register, handleSubmit } = useForm()
//   const onSubmit = (data) => console.log(data)


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName", { required: true, maxLength: 20 })} />
//       <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
//       <input type="number" {...register("age", { min: 18, max: 99 })} />
//       <input type="submit" />
//     </form>
//   )
// }