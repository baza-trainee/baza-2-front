// регуярниі вирази блокують російські літери.

export const patternName = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}](?:[\p{L} `’—'-]{0,50}[\p{L}])?$/giu;


export const patternEmail =/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/

// Регулярка символів телефону 

export const regInputPhone = /^[+1-9 ]\d{0,}$|^$/;

export const patternPhone = /^\+380[\s]?\d{2}[\s]?\d{3}[\s]?\d{2}[\s]?\d{2}$/;

export const patternMessage = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?—'-\[\]{}()_~₴#$%^&|”’`\\]{5,}$/giu;

export const patternUrlLinkedin = /^https?:\/\/(www\.)?linkedin\.com\/(in|company|school|groups)\/[a-zA-Z0-9-]+\/?$/;

export const patternNikDiscord = /^[a-z][a-z0-9_.]{1,31}$/;

export const patternCountry = /^(?:|(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}`’']{2,30}(?:[\p{L} `’'”-]{4,30}[\p{L}])?)$/giu;

export const patternСity = /^(?:|(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}`’']{2,30}(?:[\p{L} `’'”-]{2,30}[\p{L}])?)$/giu;

export const patternText = /^(?!.*[\u0401\u0451\u042B\u044B\u042D\u044D\u042A\u044A])[\p{L}\d\s.,!?—':;\\[\]{}()_~₴#$%^&№:;|«»—\s -”’`"\\]+$/giu;

export const patternPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;

export const patternNumberInput = /^[1-9]\d{0,}$|^[0]$|^$/;

export const patternLink = /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

export const patternRole = /^(?!.*[ \-—\/]{2})(?!.*[^a-zA-Z \-—\/])[a-zA-Z]+([ \-—\/][a-zA-Z]+)*$/

export const patternFacebook = /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9(\.\-_)\/?=]+\/?$/;

export const patterTelegram = /^https?:\/\/(www\.)?t\.me\/(?:[a-zA-Z0-9_]{5,32}|[+][a-zA-Z0-9_]{5,64})\/?$/;

// формат дати в інпут.
export const patternDateValue = /^\d{4}-\d{2}-\d{2}$/