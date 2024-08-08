export const checkFileSize =(value, max_size)=>{
  if(value==''){
    return true
  }else if(value){
    return value[0]?.size < max_size
  }
}