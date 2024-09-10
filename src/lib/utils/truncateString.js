export function truncateString(str, limit=300) {
  if (str && str.length <= limit) {
    return str;
  }

  // Обрізаємо строку до найближчого слова, яке не перевищує ліміт
  let truncated = str.slice(0, limit);

  // Визначаємо можливі розділові знаки, які слід враховувати
  const punctuationMarks = ['.', '!', '?', ';', ':'];

  // Перевіряємо, чи строка закінчується на розділовий знак
  let lastChar = truncated.slice(-1);
  if (punctuationMarks.includes(lastChar)) {
    return truncated.trim() + '...';
  }

  // Якщо строка обірвалася на середині слова, шукаємо найближчий розділовий знак
  let lastPunctuationIndex = -1;
  for (let i = truncated.length - 1; i >= 0; i--) {
    if (punctuationMarks.includes(truncated[i])) {
      lastPunctuationIndex = i;
      break;
    }
  }

  // Якщо знайдено розділовий знак, обрізаємо до цієї позиції
  if (lastPunctuationIndex !== -1) {
    truncated = truncated.slice(0, lastPunctuationIndex + 1);
  }

  return truncated.trim() + ' . . .';
}
