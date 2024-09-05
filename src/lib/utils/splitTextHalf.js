export const splitTextHalf = (str, min = 300) => {
  // Якщо текст коротший за мінімальну кількість символів - не розділяємо
  if (str.length < min) {
    return { strA: str };
  }

  const mid = Math.floor(str.length / 2);
  const maxDistance = 100; // межа для пошуку розділового знака
  const lineBreakReg = /\r\n|\n|\r/;
  const punctuationReg = /[.;!?]/;

  let splitIndex = -1;

  // Шукаємо розділовий знак або перенесення рядка в межах 100 символів від середини
  for (let i = mid; i < str.length && i <= mid + maxDistance; i++) {
    if (lineBreakReg.test(str[i]) || punctuationReg.test(str[i])) {
      splitIndex = i;
      break;
    }
  }

  // Якщо не знайдено в межах, продовжуємо пошук далі по тексту
  if (splitIndex === -1) {
    for (let i = mid + maxDistance + 1; i < str.length; i++) {
      if (lineBreakReg.test(str[i]) || punctuationReg.test(str[i])) {
        splitIndex = i;
        break;
      }
    }
  }

  // Якщо знайдений розділовий знак, розділяємо текст
  if (splitIndex !== -1) {
    const strA = str.slice(0, splitIndex + 1); // Розділовий знак включено до strA
    const strB = str.slice(splitIndex + 1);
    return { strA, strB };
  }
  // Якщо не знайдено жодного знака, повертаємо
  return { strA: str }
};