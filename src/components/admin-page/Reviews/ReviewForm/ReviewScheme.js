import { z } from "zod";
import { patternName, patternText, patternRole } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";

export const ReviewDefaultValues = {
  file: null,
  name_ua: "",
  name_en: "",
  name_pl: "",
  text_ua: "",
  text_en: "",
  text_pl: "",
  role:"",
  date:""
}
const MAX_SIZE_IMG = 512000

const validateImageTypes =(value)=>{
  if(value == ''){
    return true
  }else if(value){
    return checkFileType(value[0], ACCEPTED_IMAGE_TYPES)
  }
}

const transformImageValue = (value)=>{
  if(value === ''){
    return ''
  }else if(value){
    return value[0]
  }
}

export const ReviewScheme = z
	.object({
    file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateImageTypes(file),"Формат JPG, PNG, WEBP")
    .transform((value) => transformImageValue(value, ACCEPTED_IMAGE_TYPES)),

		name_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

		name_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

		name_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

    text_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 знаків' })
    .max(250, { message: 'Максимум 250 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    text_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 знаків' })
    .max(250, { message: 'Максимум 250 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    text_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 знаків' })
    .max(250, { message: 'Максимум 250 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    role:z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(2, { message: 'Мінімум 2 символи' })
      .max(20, { message: 'Максимум 20 знаків' })
      .regex(patternRole, { message: 'Не коректна назва' }),

      date:z.coerce
      .date({
        required_error: "Це поле обов'язкове",
      })
      .min(new Date("2023-04-01"), { message: "Мінімальна дата 01-04-2023" })
      .transform((value) => formatDateToNumericInputDate({dateString:value})), 
})
//  Схема відправки на бекенд:{
//   "name": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "review": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "role": "string",
//   "date": number,
//   "file": "object"
// }