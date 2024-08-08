import { z } from "zod";
import { patternLink, patternName } from "@/src/constants/regulars";
import { ACCEPTED_IMAGE_TYPES, checkFileType } from "@/src/lib/hooks/checkFileType";
import { checkFileSize } from "@/src/lib/hooks/checkFileSize";

export const addPartnerDefaultValues= {
  name: "",
  homeUrl: "",
  file: null,
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


export const addPartnerSchema = z
	.object({
    name: z.string()
    .trim()
    .min(2, { message: 'Поле назва не може бути порожнім' })
    .regex(patternName, { message: 'Введіть дійсну назву' }),

    homeUrl: z.string()
    .trim()
    .min(1, { message: 'Поле посилання не може бути порожнім' })
    .regex(patternLink, { message: 'Введіть дійсний URL' }),

    file: z.any()
    .refine((file) => checkFileSize(file, MAX_SIZE_IMG),"Max.розмір 512КБ")
    .refine((file) => validateImageTypes(file),"Формат JPG, PNG, WEBP")
    .transform((value) => transformImageValue(value, ACCEPTED_IMAGE_TYPES)), 
})
