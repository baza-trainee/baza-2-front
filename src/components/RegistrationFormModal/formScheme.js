export const formScheme = {
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    discord: "",
    linkedin: "",
    uiuxDesigner: false,
    backend: false,
    qaManualEngineer: false,
    frontend: false,
    fullstackEngineer: false,
    projectManager: false,
    t9001200: false,
    t18002100: false,
    t12001500: false,
    anytime: false,
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

};
