import { BASE_URL } from '../constants/constants'
import instance from './instance'



class ExampleClass {
	async getAllCharacters(){
		try {
			const res = await instance.get(`https://rickandmortyapi.com/api/character`)
			return res.data
		} catch (error) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getAllPartners(){
		try {
			const res = await instance.get(`${BASE_URL}/partners`)
			return res.data
		} catch (error) {
			throw new Error(error?.response?.data?.message)
		}
	}

	async getImage(id){
		try {
			const res = await instance.get(`${BASE_URL}/files/${id}`)
			return res.data
		} catch (error) {
			throw new Error(error?.response?.data?.message)
		}
	}
}

export const exampleService = new ExampleClass()