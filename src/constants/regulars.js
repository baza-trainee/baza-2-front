  // регуярниі вирази блокують російські літери. 

export const patternName = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} `’'-]{0,50}[\p{L}])?$/ugi;

export const patternEmail = /^[A-Z0-9._%+-]{2,}@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const patternEmailNonRu = /^[A-Z0-9._%+-]{2,}@[A-Z0-9.-]+\.(?!ru$|by$)[A-Z]{2,}$/i;

 // Регулярка символів телефону
export const regInputPhone = /^[+1-9 ]\d{0,}$|^$/;

export const patternPhone = /^\+380[\s]?\d{2}[\s]?\d{3}[\s]?\d{2}[\s]?\d{2}$/;

export const patternMessage = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?'-\[\]{}()_~₴#$%^&|”’`\\]{10,300}$/ugi;

export const patternUrlLinkedin = /^https:\/\/www\.linkedin\.com\/in\/[A-z0-9%/._-]{2,}/i;

export const patternNikDiscord = /^[a-z][a-z0-9_.]{1,31}$/;

export const patternCountry = /^(?:|(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}`’']{4,30}(?:[\p{L} `’'”-]{4,30}[\p{L}])?)$/ugi;

export const patternСity = /^(?:|(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}`’']{2,30}(?:[\p{L} `’'”-]{2,30}[\p{L}])?)$/ugi;

export const patternText = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?'-\[\]{}()_~₴#$%^&|”’`\\]{1,200}$/ugi;

export const patternPassword =  /(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,14}/i


export const patternNumberInput = /^[1-9]\d{0,}$|^[0]$|^$/;

export const patternLink =
/^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;





// /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{6,}/g
//  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,14}/g
// /^(?:|(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} `’'”-]{0,50}[\p{L}])?)$/ugi
// /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} `’'”-]{0,50}[\p{L}])?$/ugi;
// export const patternText = /^(?!.*\s{2,}|.*[.-]{2,})(?!.*[ЁёЫыЭэЪъ])[A-Za-zА-Яа-яІіЇїЄєҐґąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s`’'-]+$/
// const emailPattern =
//   /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

// const nonRussianLettersPattern =
//   /^(?!.*\s{2,}|.*[.-]{2,})(?!.*[ЁёЫыЭэЪъ])[A-Za-zА-Яа-яІіЇїЄєҐґąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s`’'-]+$/;

// const nonRussianLettersWithSymbolsAndDigitsPattern =
//   /^(?!.*[ЁёЫыЭэЪъ])[\w\s`’'!"#$№%&()*+,\-–—./:;<=>?@[\\\]^_`{|}~A-Za-zА-Яа-яІіЇїЄєҐґąćęłńóśźżĄĆĘŁŃÓŚŹŻ.]+$/;

