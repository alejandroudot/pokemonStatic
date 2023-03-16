import { pokeApi } from "@/api"
import { Pokemon } from "@/interfaces"

export const getPokemonInfo = async (nameOrId: string) => {

	try {
		const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`)
		return {
			id: data.id,
			name: data.name,
			sprites: data.sprites
		}
		// ! Si existe el pokemon devuelve la data, sino devuelve null
	} catch (error) {
		return null
	}

}