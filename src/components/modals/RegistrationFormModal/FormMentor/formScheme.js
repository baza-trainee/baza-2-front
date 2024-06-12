export const formScheme = {
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    phone:"",
    discord: "",
    linkedin: "",
    specialization:"",
    convenient_time:"",
    agree: false,
  },
  firstName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  lastName:{
    required: true, 
    minLength:2, 
    maxLength:30, 
    // регуярний вираз блокує російські літери.
     pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  specialization:{
    required: true, 
    // minLength:2, 
    // maxLength:30, 
    // регуярний вираз блокує російські літери.
    //  pattern: /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,28}[\p{L}])?$/ugi
  },
  email:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$|by$)[A-Z]{2,}$/i
  },
  phone:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$)[A-Z]{2,}$/i
  },
  discord:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$)[A-Z]{2,}$/i
  }, 
  linkedin:{
    required: true,
    minLength:2,
    maxLength:50,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|рф$)[A-Z]{2,}$/i
  },
  convenient_time:{
    required: true, 
  },
};
const form = {
  firstName: 'string',
  lastName: 'string',
  email: 'string',  //email@gmail.com
  phone:'string',   //+38 111 22 33
  discord: 'string',
  linkedin: 'string',
  specialization:'string', // UI\UX designer
  convenient_time:'string',// 18.00-21.00
}

const form2 = {
  // Форма учасника !?
  firstName: 'string',
  lastName: 'string',
  specialization:'string', // UI\UX designer
  email: 'string',  //email@gmail.com
  city:'string',
  discord: 'string',
  linkedin: 'string',
  experience:'boolean',  //  Наявність досвіду 'boolean' або 'string'?
  motivation:'string',   // В чому мотивація створити продукт
  saw_questionnaire:'string',  // Я побачив/побачила анкету
}