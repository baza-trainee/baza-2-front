export const MAX_FILE_SIZE_IMG = 5000000;

export const ACCEPTED_IMAGE_TYPES = [
  'jpeg',
  'png',
  'webp',
  'jpg',
];

export const ACCEPTED_DOCUMENTS_TYPES = [
  'pdf',
];

export function checkFileType(file,types) {
  if(!file){return true}
  if (file?.name) {
    const fileType = file.name.split(".").pop().toLowerCase();
    if (types.includes(fileType)) return true;
  }
  return false;
}