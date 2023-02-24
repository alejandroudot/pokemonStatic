import { useEffect, useState } from 'react';

import { Layout } from "@/components/layouts"
import { NoFavorites } from "@/components/ui"
import localFavorites from '../../utils/localFavorites';
import { FavoritePokemons } from '@/components/pokemon';

export const FavoritesPage = () => {

	const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

	useEffect(() => {
		setFavoritePokemons(localFavorites.pokemons)
	},[])

	return (
		<Layout title='Favoritos'>
			{
				favoritePokemons.length === 0
					? (<NoFavorites/>)
					: (
						<FavoritePokemons favoritePokemons={favoritePokemons}/>
					)
			}
		</Layout>

	)
}

export default FavoritesPage