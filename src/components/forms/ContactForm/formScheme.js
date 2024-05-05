export const formScheme={
  defaultValues: { firstName: "", email:'', message:''},
  firstName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    pattern: /^[A-zіІїЇЄє _']+$/i
  },
  email:{
    required: true,
    minLength:2
  },
  message:{
    required: true, 
    minLength:2, 
    maxLength:30
  }
}