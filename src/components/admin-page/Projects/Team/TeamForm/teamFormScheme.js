import { z } from "zod";
import { patternName, patternUrlLinkedin } from "@/src/constants/regulars";

export const teamDefaultValues = {
  name_ua: "",
  name_en: "",
  name_pl: "",
  profileUrl:'',
  specialization:''
}

export const TeamScheme = z
	.object({
		name_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternName, { message: 'Присутні некоректні символи' }),

		name_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternName, { message: 'Присутні некоректні символи' }),

		name_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternName, { message: 'Присутні некоректні символи'}),

    profileUrl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .regex(patternUrlLinkedin, { message: 'Введіть дійсний URL'}),

    specialization: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
})