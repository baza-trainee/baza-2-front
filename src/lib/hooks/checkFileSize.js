export const checkFileSize =(value, max_size)=>{
 
  if(value==''){
   return true
  }else if(value && value[0]?.size){
    return value[0]?.size < max_size
  }else return true
}