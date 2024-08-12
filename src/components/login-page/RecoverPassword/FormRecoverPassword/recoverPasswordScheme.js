import { z } from "zod";
import { patternPassword } from "@/src/constants/regulars";

export const recoverPasswordDefaultValues= {
  password:"",
  confirmPassword:''
}

const validatePassword=(str,value)=>{
  const myExp = new RegExp(str);
  return myExp.test(value)
}

export const recoverPasswordSchema = z
	.object({
    password: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Введіть коректний пароль' }),

    confirmPassword: z.string()
      .trim()
      .min(1, { message: 'Поле пароль не може бути порожнім' })
  })
  .refine((data) => validatePassword(data.password, data.confirmPassword), {
    message: 'Паролі не збігаються. Спробуйте ще раз.',
    path: ['confirmPassword'],
  })
