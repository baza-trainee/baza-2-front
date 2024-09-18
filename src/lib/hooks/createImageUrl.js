const BASE_API_URL = process.env.NEXT_PUBLIC_API2_URL

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export const createImageUrl = (url) => {
  if(isValidUrl(url)){return url }
  else return `${BASE_API_URL}/files/${url}`
}