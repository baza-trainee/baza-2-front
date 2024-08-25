// Трансформація файлу
export const transformFileValue = (value)=>{
  if(value === ''){
    return ''
  }else if(value){
    return value[0]
  }
}