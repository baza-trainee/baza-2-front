import { z } from "zod";
import { patternName, patternText } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType, MAX_FILE_SIZE_IMG } from "@/src/lib/hooks/checkFileType";

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
    return value[0]?.size < MAX_FILE_SIZE_IMG && checkFileType(value[0],ACCEPTED_IMAGE_TYPES)
  }
}


export const ReviewScheme = z
	.object({
    file: z.any()
    .refine((file) => validateImage(file),"Формат JPG, PNG, WEBP, Max.розмір 2MB"),

		name_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Ім’я мінімум 2 символа' })
    .max(20, { message: 'Ім’я максимум 20 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

		name_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Ім’я мінімум 2 символа' })
    .max(20, { message: 'Ім’я максимум 20 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

		name_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Ім’я мінімум 2 символа' })
    .max(20, { message: 'Ім’я максимум 20 знаків' })
    .regex(patternName, { message: 'Введіть коректне ім’я' }),

    text_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .max(50, { message: 'Текст максимум 50 знаків' }),
    //.regex(patternText, { message: 'Не використовуйте російські літери' }),

    text_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .max(50, { message: 'Текст максимум 50 знаків' }),

    text_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .max(50, { message: 'Текст максимум 50 знаків' }),

    role:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Спеціалізація мінімум 2 символи' })
    .max(20, { message: 'Спеціалізація максимум 20 знаків' }),
    //.regex(patternText, { message: 'Не використовуйте російські літери' }),

    date:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст повинен мати не менше 5 знаків' }),
    //.regex(patternText, { message: 'Не використовуйте російські літери' }),

})
// {
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
//   "date": 0,
//   "imageUrl": "string"
// }