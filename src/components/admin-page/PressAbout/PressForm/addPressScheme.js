import { z } from "zod";
import { patternName, patternText } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType, MAX_FILE_SIZE_IMG } from "@/src/lib/hooks/checkFileType";

export const PressDefaultValues = {
  file:null,
  title_ua: "",
  text_ua: "",
}

const validateImage =(value)=>{
  if(value==''){
    return true
  }else if(value){
    return value[0]?.size < MAX_FILE_SIZE_IMG && checkFileType(value[0],ACCEPTED_IMAGE_TYPES)
  }
}


export const PressScheme = z
	.object({
    file: z.any()
    .refine((file) => validateImage(file),"Формат JPG, PNG, WEBP, Max.розмір 2MB"),

		title_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(2, { message: 'Ім’я мінімум 2 символа' })
    .max(20, { message: 'Ім’я максимум 20 знаків' })
   .regex(patternName, { message: 'Введіть коректне ім’я' }),

    text_ua: z.string()
    .trim()
    .min(1, { message: "Це поле обов'язкове"})
    .min(5, { message: 'Текст мінімум 5 знаків' })
    .max(50, { message: 'Текст максимум 50 знаків' })
    .regex(patternText, { message: 'Не використовуйте російські літери' }),
})
