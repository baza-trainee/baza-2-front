  // регуярниі вирази блокують російські літери. 

export const patternName = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} '-]{0,50}[\p{L}])?$/ugi;

export const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?!ru$|by$)[A-Z]{2,}$/i;

export const patternPhone = /^\+380[\s]?\d{2}[\s]?\d{3}[\s]?\d{2}[\s]?\d{2}$/;

export const patternMessage = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?'-\[\]{}()]{9,300}$/ugi;