export const checkFileSize =(value, max_size)=>{
 
  if(value==''){
   return true
  }else if(value){
    console.log(value[0]?.size)
    return value[0]?.size < max_size
  }
}