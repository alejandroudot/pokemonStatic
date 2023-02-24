const toggleFavorite = (id: number) => {
	let favorites: /* Arreglo de numeros */ number[] = JSON.parse(localStorage.getItem('favorites') || '[]') /* no puede devolver null entonces el arreglo o '[]' */

	if (favorites.includes(id)) {
		favorites = favorites.filter(pokeId => pokeId !== id) /* devuelve todo lo que sea distinto del id (el id se queda fuera) */
	} else {
		favorites.push(id)
	}
	localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existInFavorites = (id:number): boolean => {

	if (typeof window === 'undefined') return false /* si se esa renderizando del lado del server retorna false */

	const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

	return favorites.includes(id);
}

const pokemons = (): number[] => {
	return JSON.parse(localStorage.getItem('favorites') || '[]')
}

const localFavorites = {
	toggleFavorite,
	existInFavorites,
	pokemons
}

export default localFavorites