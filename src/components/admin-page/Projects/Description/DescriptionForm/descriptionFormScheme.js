import { z } from "zod";
import { patternName, patternText, patternRole } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";

export const ProjectDefaultValues = {
  title_ua: "",
  title_en: "",
  title_pl: "",
  creationDate: "",
  launchDate: "",
  isTeamRequired: '',
  complexity: 1,
  deployUrl:"",
  file: null,
  teamMembers:[]
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

const normalize = (text) => text.replace(/\r?\n|\r/g, '');

export const ProjectScheme = z
	.object({
		title_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символів'})
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternText, { message: 'Введіть коректне ім’я' }),

		title_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символів'})
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternText, { message: 'Введіть коректне ім’я' }),

		title_pl: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символів'})
    .max(18, { message: 'Максимум 18 знаків' })
    .regex(patternText, { message: 'Введіть коректне ім’я' }),

    creationDate:z.coerce
    .date({
      required_error: "Це поле обов'язкове",
    })
    .min(new Date("2023-04-01"), { message: "Мінімальна дата 01-04-2023" })
    .transform((value) => formatDateToNumericInputDate({dateString:value})),

    launchDate:z.coerce
    .date({
      required_error: "Це поле обов'язкове",
    })
    .min(new Date("2023-04-01"), { message: "Мінімальна дата 01-04-2023" })
    .transform((value) => formatDateToNumericInputDate({dateString:value})),

    isTeamRequired:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"}),

    complexity:z.string()
    .trim(),


    deployUrl:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"}),

    file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateImageTypes(file),"Формат JPG, PNG, WEBP")
    .transform((value) => transformImageValue(value, ACCEPTED_IMAGE_TYPES)),

    teamMembers:z.string()
    .trim(),

    // text_ua: z.string()
    // .trim()
    // .min(1, { message: "Це поле обов'язкове"})
    // .min(5, { message: 'Мінімум 5 знаків' })
    // .transform(normalize)
    // .pipe(z.string()
    // .max(250, { message: 'Текст максимум 250 знаків' })
    // .regex(patternText, { message: 'Присутні не коректні символи' })),

    // text_en: z.string()
    // .trim()
    // .min(1, { message: "Це поле обов'язкове"})
    // .min(5, { message: 'Мінімум 5 знаків' })
    // .transform(normalize)
    // .pipe(z.string()
    // .max(250, { message: 'Текст максимум 250 знаків' })
    // .regex(patternText, { message: 'Присутні не коректні символи' })),




    date:z.coerce
    .date({
      required_error: "Це поле обов'язкове",
    })
    .min(new Date("2023-04-01"), { message: "Мінімальна дата 01-04-2023" })
    .transform((value) => formatDateToNumericInputDate({dateString:value})), 
})
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