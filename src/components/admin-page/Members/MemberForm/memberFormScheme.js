import { z } from "zod";
import { patternName, patternUrlLinkedin } from "@/src/constants/regulars";

export const memberDefaultValues = {
  name_ua: "",
  name_en: "",
  name_pl: "",
  profileUrl:'',
}

export const MemberScheme = z
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
})
//  Схема відправки на бекенд:
// {
//   "name": {
//     "en": "John Doe",
//     "pl": "Jan Kowalski",
//     "ua": "Іван Петрович"
//   },
//   "profileUrl": "https://www.linkedin.com/in/johndoe"
// }