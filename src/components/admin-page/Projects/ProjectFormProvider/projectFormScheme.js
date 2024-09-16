import { z } from "zod";
import { patternText, patternLink, patternDateValue } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";
import { validateFileTypes } from "@/src/lib/hooks/validateFileTypes";
import { transformFileValue } from "@/src/lib/hooks/transformFileValue";
import { maxDateValue, minDateValue } from "@/src/lib/hooks/minMaxDate";

export const ProjectDefaultValues = {
  title_ua: "",
  title_en: "",
  title_pl: "",
  creationDate: "",
  launchDate: '',
  isTeamRequired: '',
  complexity: 1,
  deployUrl: '',
  file: null,
}

// максимальний розмір файла 1MB
const MAX_SIZE_IMG = 1048576

// Перевірка Url
const validateUrl =(url)=>{
  if(url===''){
    return true
  }else{
    return patternLink.test(url)
  }
}

// Повідомлення помилки
const messageError= {
  message: "Це поле обов'язкове",
  path: ['launchDate'],
}

// Перевірка дати завершення проєкту
const validateLaunchDate=(state, date, startDate)=>{
  if(state === 'done'){
    if(date === ''){
      messageError.message = "Це поле обов'язкове"
      return false
    }else{ 
      messageError.message ='Дата менша дати створення + тиждень'
      return formatDateToNumericInputDate({dateString:date}) - 604800000 >= startDate
    }
  }else {
    messageError.message = "Це поле обов'язкове"
    return true
  }
}

export const ProjectScheme = z
	.object({
		title_ua: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(5, { message: 'Мінімум 5 символів'})
      .max(100, { message: 'Максимум 100 символів' })
      .regex(patternText, { message: 'Присутні некоректні символи' }),

		title_en: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(5, { message: 'Мінімум 5 символів'})
      .max(100, { message: 'Максимум 100 символів' })
      .regex(patternText, { message: 'Присутні некоректні символи' }),

		title_pl: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(5, { message: 'Мінімум 5 символів'})
      .max(100, { message: 'Максимум 100 символів' })
      .regex(patternText, { message: 'Присутні некоректні символи' }),

    creationDate: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .regex(patternDateValue, { message: 'Введіть коректну дату' })
      .refine((value) => minDateValue(value),{ message: "Мінімальна дата 01-04-2023" })
      .refine((value) => maxDateValue(value, formatDateToNumericInputDate({timestamp:Date.now()})), { message: "Дата не може бути більша ніж сьогодні" })
      .transform((value) => formatDateToNumericInputDate({dateString:value})),

    launchDate: z.string()
      .trim(),

    isTeamRequired:z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"}),
    
    complexity:z.number().min(1, { message: "Це поле обов'язкове"}),

    deployUrl:z.string()
      .trim()
      .refine((value) => validateUrl(value),{ message: "Введіть дійсний URL" })
      .optional(),

    file: z.any()
      .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 1MB")
      .refine((file) => validateFileTypes(file, ACCEPTED_IMAGE_TYPES),"Формат JPG, PNG, WEBP")
      .transform((value) => transformFileValue(value, ACCEPTED_IMAGE_TYPES)),

})  
.refine((data) => validateLaunchDate(data.isTeamRequired , data.launchDate, data.creationDate), messageError
)

//  Схема відправки на бекенд: {
//   "title": {
//     "en": "Project A",
//     "pl": "Projekt A",
//     "ua": "Проект A"
//   },
//   "file": "($binary)",
//   "deployUrl": "https://example.com/deploy",
//   "isTeamRequired": true,
//   "creationDate": 1669872000000,
//   "launchDate": 1669872000000,
//   "complexity": 1,
//   "teamMembers": [
//     {
//       "teamMember": {
//         "_id": "6471fa06933513f26024a990",
//         "name": {
//           "en": "John Doe",
//           "pl": "Jan Kowalski",
//           "ua": "Іван Петрович"
//         },
//         "profileUrl": "https://www.linkedin.com/in/johndoe"
//       },
//       "teamMemberRole": {
//         "_id": "6471f9a29c17ac2190eb8791",
//         "name": {
//           "en": "Developer",
//           "pl": "Programista",
//           "ua": "Розробник"
//         }
//       }
//     }
//   ]
// }