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
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Пароль має складатись з 8 символів і  містити цифри та латинські літери' }),

    confirmPassword: z.string()
      .trim()
      .min(1, { message: 'Поле пароль не може бути порожнім' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються.Спробуйте ще раз.',
     path: ['confirmPassword'],
  })

 