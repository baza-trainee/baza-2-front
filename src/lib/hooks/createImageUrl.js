import { BASE_URL, BASE_URL2 } from "@/src/constants/constants"

export const createImageUrl = (id) =>{return `${BASE_URL2}/v1/files/${id}`}

export const createImageUrlBaza1 = (id) =>{return `${BASE_URL}/files/${id}`}