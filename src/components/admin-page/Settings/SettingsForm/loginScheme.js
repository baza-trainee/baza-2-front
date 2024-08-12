import { z } from "zod";
import { patternEmail, patternPassword,  } from "@/src/constants/regulars";

export const loginDefaultValues= {
  email: "",
  password:"",
}

export const loginSchema = z
	.object({
		email: z.string()
    .trim()
    .min(2, { message: 'Поле email не може бути порожнім' })
    .email({ message: 'Введіть дійсний email' })
    .regex(patternEmail, { message: 'Введіть дійсний email' })
    .refine(
      (value) => !/(.ru|.by)$/.test(value.split('@')[1]),
      {
        message: 'Домени .ru і .by не допускаються',
      }),

    password: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Пароль має містити цифри та латинські літери' }),
  })