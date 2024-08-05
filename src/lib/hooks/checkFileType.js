export const MAX_FILE_SIZE_IMG = 2000000;

export const ACCEPTED_IMAGE_TYPES = [
  'jpeg',
  'png',
  'webp',
  'jpg',
];

export function checkFileType(file,types) {
  if (file?.name) {
    const fileType = file.name.split(".").pop().toLowerCase();
    if (types.includes(fileType)) return true;
  }
  return false;
}