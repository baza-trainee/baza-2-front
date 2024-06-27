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
}

export const exampleService = new ExampleClass()

export default function fetchPartnerList() {
  
}