export const formScheme={
  defaultValues: { firstName: '', email:'', message:''},
  firstName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi


  },
  email:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$)[A-Z]{2,}$/i
  },
  message:{
    required: true, 
    minLength:2, 
    maxLength:300,
    // регуярний вираз блокує російські літери.
    pattern:/^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?'-\[\]{}()]{9,300}$/ugi
  }
}