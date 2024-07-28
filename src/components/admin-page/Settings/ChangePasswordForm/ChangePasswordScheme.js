import { z } from "zod";
import { patternPassword } from "@/src/constants/regulars";

export const changePasswordDefaultValues= {
  oldPassword: "",
  newPassword:"",
}

export const changePasswordScheme = z
	.object({
    oldPassword: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Пароль має складатись з 8 символів і  містити цифри та латинські літери' }),

    newPassword: z.string()
    .trim()
    .min(1, { message: 'Поле пароль не може бути порожнім' })
    .min(8, { message: 'Пароль має містити мінімум 8 символів' })
    .max(14, {message: 'Пароль має містити максимум 14 символів'})
    .regex(patternPassword, { message: 'Пароль має складатись з 8 символів і  містити цифри та латинські літери' }),
  }) 