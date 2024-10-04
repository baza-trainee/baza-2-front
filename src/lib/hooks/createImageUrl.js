const BASE_API_URL = process.env.NEXT_PUBLIC_API2_URL

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
// Використовується для завантаження PDF документів
export const createImageUrl = (url) => {
  if(isValidUrl(url)){return url }
  else return `${BASE_API_URL}/files/${url}`
}
// Використовується для завантаження картинок з сервера
export const imageLoader = ({ src, width, quality }) => {
  if(isValidUrl(src)){return src }
  return `${BASE_API_URL}/files/${src}?w=${width}&q=${quality || 75}`
}