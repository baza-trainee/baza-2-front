export const splitTextHalf = (str, min=300) => {
  // Якщо текст коротший за 300 символів-не розділяємо
  if(str.length < min){return { strA:str }}

  let stop = false;
  const mid = Math.floor(str.length / 2);
  // Найближчий розділовий знак
  const reg = /[.;!?]/;

  let strA = [...str].reduce((acc, char, i) => {
    if (i >= mid && reg.test(char)) stop = true;
    return !stop ? acc + char : acc;
  }, '');

  // Оновимо першу частину, щоб включити розділовий знак
  if (stop && mid < str.length && reg.test(str[strA.length])) {
    strA += str[strA.length];
  }
  const strB = str.slice(strA.length);
  return { strA, strB };
};