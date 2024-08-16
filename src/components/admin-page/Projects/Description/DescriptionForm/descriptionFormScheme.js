import { date, z } from "zod";
import { patternName, patternText, patternRole } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType } from "@/src/lib/hooks/checkFileType";
import { formatDateToNumericInputDate } from "@/src/lib/utils/formatData";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";

export const ProjectDefaultValues = {
  title_ua: "",
  title_en: "",
  title_pl: "",
  creationDate: "",
  launchDate: '',
  isTeamRequired: 'teamFormation',
  //complexity: 0,
  deployUrl:"",
  file: null,
  //teamMembers:[]
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

//const normalize = (text) => text.replace(/\r?\n|\r/g, '');

const patternDateValue = /^\d{4}-\d{2}-\d{2}$/

const minDateValue=(value, minDate="2023-04-01")=>{
  if(value===''){
    return true
  }else {
   return formatDateToNumericInputDate({dateString:value}) >= formatDateToNumericInputDate({dateString:minDate})
  }
}

const validateLaunchDate=(state, date)=>{
  if(state === 'done'){
    if(date === ''){
      return false
    }else{ 
      return true
    }
  }else return true
}


export const ProjectScheme = z
	.object({
		title_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символів'})
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternText, { message: 'Введіть коректний заголовок' }),

		title_en: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Мінімум 5 символів'})
    .max(50, { message: 'Максимум 50 знаків' })
    .regex(patternText, { message: 'Введіть коректний заголовок' }),

		title_pl: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .min(5, { message: 'Мінімум 5 символів'})
      .max(50, { message: 'Максимум 50 знаків' })
      .regex(patternText, { message: 'Введіть коректний заголовок' }),

    creationDate: z.string()
      .trim()
      .min(1, { message: "Це поле обов'язкове"})
      .regex(patternDateValue, { message: 'Введіть коректну дату' })
      .refine((value) => minDateValue(value),{ message: "Мінімальна дата 01-04-2023" }).transform((value) => formatDateToNumericInputDate({dateString:value})),


    launchDate: z.string()
    .trim()
    //.min(1, { message: "Це поле обов'язкове"})
    //.regex(patternDateValue, { message: 'Введіть коректну дату' })
    .refine((value) => minDateValue(value, formatDateToNumericInputDate({timestamp:Date.now()})), { message: "Дата не може бути меньша за сьогодні" }),

    isTeamRequired:z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"}),

    deployUrl:z.string()
    .trim().optional(),
    //.min(1, { message: "Це поле обов'язкове"}),

    file: z.any()
    //.refine((file)=>{ file==='' },"Це поле обов'язкове")
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 500КБ")
    .refine((file) => validateImageTypes(file),"Формат JPG, PNG, WEBP")
    .transform((value) => transformImageValue(value, ACCEPTED_IMAGE_TYPES)),

 
})  
.refine((data) => validateLaunchDate(data.isTeamRequired , data.launchDate), {
  message: "Це поле обов'язкове",
  path: ['launchDate'],
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