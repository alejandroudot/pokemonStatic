import { NextPage, GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts/Layout';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '@/components/pokemon';


interface Props {
	pokemons: SmallPokemon[];
}


const HomePage: NextPage<Props> = ({ pokemons }) => {

	return (
		<Layout title='Listado de pokemons'>

			<Grid.Container gap={ 2 } justify='flex-start' >
				{
					pokemons.map((pokemon) => (
						<PokemonCard key={ pokemon.id } pokemon={ pokemon } />
					))
				}
			</Grid.Container>

		</Layout>
	)
}

// ! Usamos getStaticProps cuando vamos a usar informacion que no va a cambiar y creamos las props del lado del servidor de manera estatica haciendo el fetch en el buildTime
// * Solo se puede usar dentro de las pages, no en componentes

export const getStaticProps: GetStaticProps = async (ctx) => {

	// ? Como el get viene any implicito, le especificamos el tipo de dato que tiene que devolver
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

	// * Armamos el objetito con la data que nos faltaba (imagen y id)
	// ! SmallPokemon[] asi con arreglos lo que le decimos es que va a ser un arreglo que adentro tenga esas props
	const pokemons: SmallPokemon[] = data.results.map((poke, pokeId) => {
		return {
			...poke,
			id: pokeId + 1,
			img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId + 1}.svg`
		}
	})

	return {
		props: {
			pokemons
		}
	}
}

export default HomePage;