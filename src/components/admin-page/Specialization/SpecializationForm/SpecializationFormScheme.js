import { z } from "zod";
import { patternName } from "@/src/constants/regulars";

export const roleDefaultValues = {
  name_ua: "",
  name_en: "",
  name_pl: "",
}


export const RoleScheme = z
	.object({
		name_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternName, { message: 'Присутні не коректні символи' }),

		name_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternName, { message: 'Присутні не коректні символи' }),

		name_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символа' })
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternName, { message: 'Присутні не коректні символи'}),
})
//  Схема відправки на бекенд:
// {
//   "name": {
//     "en": "Developer",
//     "pl": "Programista",
//     "ua": "Розробник"
//   }
// }