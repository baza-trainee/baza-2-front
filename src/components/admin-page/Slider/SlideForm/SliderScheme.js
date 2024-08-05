import { z } from "zod";
import { patternText } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType, MAX_FILE_SIZE_IMG } from "@/src/lib/hooks/checkFileType";

export const SliderDefaultValues= {
  file:null,
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
    .refine((file) => validateImage(file),"Формат зображення JPG, PNG, WEBP, Max.розмір 2MB"),

		title_ua: z.string()
    .trim()
    .min(1, { message: 'Поле заголовок не може бути порожнім' })
    .min(5, { message: 'Заголовок повинен мати не менше 5 знаків' })
    .regex(patternText, { message: 'Не використовуйте російські літери' }),

		title_en: z.string()
    .trim()
    .min(1, { message: 'Поле заголовок не може бути порожнім' })
    .min(5, { message: 'Заголовок повинен мати не менше 5 знаків' })
    .regex(patternText, { message: 'Не використовуйте російські літери' }),

		title_pl: z.string()
    .trim()
    .min(1, { message: 'Поле заголовок не може бути порожнім' })
    .min(5, { message: 'Заголовок повинен мати не менше 5 знаків' })
    .regex(patternText, { message: 'Не використовуйте російські літери' }),

    text_ua: z.string()
    .trim()
    .min(1, { message: 'Поле текст не може бути порожнім' })
    .min(5, { message: 'Текст повинен мати не менше 5 знаків' })
    .regex(patternText, { message: 'Не використовуйте російські літери' }),

    text_en: z.string()
    .trim()
    .min(1, { message: 'Поле текст не може бути порожнім' })
    .min(5, { message: 'Текст повинен мати не менше 5 знаків' })
    .regex(patternText, { message: 'Не використовуйте російські літери' }),

    text_pl: z.string()
    .trim()
    .min(1, { message: 'Поле текст не може бути порожнім' })
    .min(5, { message: 'Текст повинен мати не менше 5 знаків' })
    .regex(patternText, { message: 'Не використовуйте російські літери' }),

})
// {
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
//   "file": "string"
// }