export const splitTextHalf = (str, min = 300) => {
  // Якщо текст коротший за мінімальну кількість символів - не розділяємо
  if (str.length < min) {
    return { strA: str };
  }

  let stop = false;
  const mid = Math.floor(str.length / 2);
  const maxDistance = 100; // межа для пошуку розділового знака

  // Регулярний вираз для пошуку перенесення рядка
  const lineBreakReg = /\r\n|\n|\r/;
  // Регулярний вираз для пошуку інших розділових знаків
  const punctuationReg = /[.;!?]/;

  // Спочатку шукаємо перенесення рядка в межах 100 символів
  let strA = [...str].reduce((acc, char, i) => {
    if (i >= mid && i <= mid + maxDistance && lineBreakReg.test(char)) {
      stop = true;
    }
    return !stop ? acc + char : acc;
  }, '');

  // Якщо не знайдено перенесення рядка в межах 100 символів, шукаємо інші розділові знаки
  if (!stop) {
    strA = [...str].reduce((acc, char, i) => {
      if (i >= mid && i <= mid + maxDistance && punctuationReg.test(char)) {
        stop = true;
      }
      return !stop ? acc + char : acc;
    }, '');
  }

  // Якщо не знайдено жодного знака в межах, продовжуємо пошук далі по тексту
  if (!stop) {
    for (let i = mid + maxDistance + 1; i < str.length; i++) {
      if (lineBreakReg.test(str[i]) || punctuationReg.test(str[i])) {
        strA = str.slice(0, i + 1);
        break;
      }
    }
  }

  // Друга частина тексту після знайденого розділового знака
  const strB = str.slice(strA.length);
  return { strA, strB };
};