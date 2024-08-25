import { formatDateToNumericInputDate } from "../utils/formatData"

// перевірка мінімальної дати
export const minDateValue=(value, minDate="2023-04-01")=>{
  if(value===''){
    return true
  }else {
   return formatDateToNumericInputDate({dateString:value}) >= formatDateToNumericInputDate({dateString:minDate})
  }
}

// Максимальна дата
export const maxDateValue=(value, maxDate)=>{
  if(value===''){
    return true
  }else {
   return formatDateToNumericInputDate({dateString:value}) <= formatDateToNumericInputDate({dateString:maxDate})
  }
}