import { z } from "zod";
import { patternName, patternText, patternRole } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType, MAX_FILE_SIZE_IMG } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";

export const ReviewDefaultValues = {
  file:null,
  name_ua: "",
  name_en: "",
  name_pl: "",
  text_ua: "",
  text_en: "",
  text_pl: "",
  role:"",
  date:""
}

const validateImage =(value)=>{
  if(value==''){
    return true
  }else if(value){
    return value[0]?.size < 512000 && checkFileType(value[0],ACCEPTED_IMAGE_TYPES)
  }
}


export const ReviewScheme = z
	.object({
    file: z.any()
    .refine((file) => validateImage(file),"Формат JPG, PNG, WEBP, Max.розмір 512KB"),

		name_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(20, { message: 'Максимум 20 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

		name_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(20, { message: 'Максимум 20 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

		name_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Мінімум 2 символа' })
    .max(20, { message: 'Максимум 20 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

    text_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 знаків' })
    .max(300, { message: 'Максимум 300 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    text_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 знаків' })
    .max(300, { message: 'Максимум 300 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    text_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 знаків' })
    .max(300, { message: 'Максимум 300 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    role:z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(2, { message: 'Мінімум 2 символи' })
      .max(20, { message: 'Максимум 20 знаків' })
      .regex(patternRole, { message: 'Не коректна назва' }),

    date:z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .transform((value) => formatDateToNumericInputDate({dateString:value})),
    // .trim()
    // .min(1, { message: "Це поле обов'язкове"})
    // .min(5, { message: 'Текст повинен мати не менше 5 знаків' }),
    //.regex(patternText, { message: 'Не використовуйте російські літери' }),

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
//   "imageUrl": "object"
// }