// Вирізає переноси строки з тексту
export const normalizeTextValue = (text) => text.replace(/\r?\n|\r/g, '');