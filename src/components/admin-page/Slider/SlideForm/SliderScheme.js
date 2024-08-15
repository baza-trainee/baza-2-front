import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, checkFileType } from "@/src/lib/hooks/checkFileType";
import { patternText } from "@/src/constants/regulars";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";

export const SliderDefaultValues= {
  file: null,
  title_ua: "",
  title_en: "",
  title_pl: "",
  text_ua: "",
  text_en: "",
  text_pl: "",
}

const MAX_SIZE_IMG = 1048576

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

const normalize = (text) => text.replace(/\r?\n|\r/g, '');

export const SliderScheme = z
	.object({
    file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 1MB")
    .refine((file) => validateImageTypes(file),"Формат JPG, PNG, WEBP")
    .transform((value) => transformImageValue(value, ACCEPTED_IMAGE_TYPES)),

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
    .max(40, { message: 'Заголовок максимум 40 знаків' })
    .regex(patternText, { message: 'Присутні не коректні символи' }),

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
    .transform(normalize)
    .pipe(z.string().max(360, { message: 'Текст максимум 360 знаків' }).regex(patternText, { message: 'Присутні не коректні символи' })),
 
    text_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків' }) 
    .transform(normalize)
    .pipe(z.string().max(360, { message: 'Текст максимум 360 знаків' }).regex(patternText, { message: 'Присутні не коректні символи' })),

    text_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове" })
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .transform(normalize)
    .pipe(z.string().max(360, { message: 'Текст максимум 360 знаків' }).regex(patternText, { message: 'Присутні не коректні символи' })),

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