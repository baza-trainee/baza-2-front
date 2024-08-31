const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const BASE_URL2 = process.env.NEXT_PUBLIC_API2_URL

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
  else return `${BASE_URL2}/files/${url}`
}

export const createImageUrlBaza1 = (url) =>{
  if(isValidUrl(url)){return url }
  else return `${BASE_URL}/files/${url}`
}