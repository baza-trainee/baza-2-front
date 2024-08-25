import { checkFileType } from "./checkFileType"

// Валідація типу файлу.
export const validateFileTypes =(value, typeFile)=>{
  if(value == ''){
    return true
  }else if(value){
    return checkFileType(value[0], typeFile)
  }
}