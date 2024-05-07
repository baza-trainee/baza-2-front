export const formScheme={
  defaultValues: { firstName: '', email:'', message:''},
  firstName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    pattern: /^\p{L}{1,}[\p{L}\p{M} -_]*\p{L}$/ugi
  },
  email:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  },
  message:{
    required: true, 
    minLength:2, 
    maxLength:300
  }
}