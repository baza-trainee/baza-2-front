import { z } from "zod";
import { patternPassword } from "@/src/constants/regulars";

export const recoverPasswordDefaultValues= {
  password:"",
  confirmPassword:''
}

export const recoverPasswordSchema = z
	.object({
    password: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(6, { message: 'Пароль має містити мінімум 6 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Пароль має складатись з 6 символів і  містити цифри та латинські літери' }),

    confirmPassword: z.string()
      .trim()
      .min(1, { message: 'Поле пароль не може бути порожнім' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються.Спробуйте ще раз.',
     path: ['confirmPassword'],
  })

 