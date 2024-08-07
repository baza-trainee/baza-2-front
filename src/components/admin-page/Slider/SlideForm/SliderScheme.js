import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, checkFileType, MAX_FILE_SIZE_IMG } from "@/src/lib/hooks/checkFileType";
import { patternText } from "@/src/constants/regulars";

export const SliderDefaultValues= {
  file: null,
  title_ua: "",
  title_en: "",
  title_pl: "",
  text_ua: "",
  text_en: "",
  text_pl: "",
}

const validateImage =(value)=>{
  if(value==''){
    return true
  }else if(value){
    return value[0]?.size < MAX_FILE_SIZE_IMG && checkFileType(value[0],ACCEPTED_IMAGE_TYPES)
  }
}

export const SliderScheme = z
	.object({
    file: z.any()
    .refine((file) => validateImage(file),"Формат фото JPG, PNG, WEBP, Max.розмір 2MB"),

		title_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Заголовок мінімум 5 знаків' })
    .max(40, { message: 'Заголовок максимум 40 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

		title_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Заголовок мінімум 5 знаків'})
    .max(40, { message: 'Заголовок максимум 40 знаків' }),

		title_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Заголовок мінімум 5 знаків' })
    .max(40, { message: 'Заголовок максимум 40 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    text_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків'})
    .max(350, { message: 'Текст максимум 350 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    text_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .max(350, { message: 'Текст максимум 350 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

    text_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .max(350, { message: 'Текст максимум 350 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

})

// Схема відправки на бекенд:{
//   "title": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "subtitle": {
//     "en": "string",
//     "pl": "string",
//     "ua": "string"
//   },
//   "file": "object"
// }