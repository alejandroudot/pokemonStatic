import { useState } from 'react';

import Image from 'next/image';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti'

import { Layout } from '@/components/layouts'
import { pokeApi } from '@/api';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import localFavorites from '../../utils/localFavorites';
import { getPokemonInfo } from '../../utils/getPokemonInfo';


interface Props {
	pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(pokemon.id)
		setIsInFavorites(!isInFavorites)
		if (!isInFavorites) {
			confetti({
				zIndex: 999,
				particleCount: 100,
				spread: 160,
				angle: -100,
				origin: {
					x: 1,
					y: 0
				}
			})
		}
	}

	const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))

	return (
		<Layout title={`${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}`}>

			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={ 12 } sm={ 4 }>
					<Card isHoverable css={{ padding: '30px'}}>
						<Card.Body>
							<Card.Image	src={ pokemon.sprites.other?.dream_world.front_default || 'no-image.png'} alt={ pokemon.name } width='100%' height={200}/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid	xs={12} sm={ 8 }>
					<Card>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
							<Text h1 transform='capitalize'>
								{ pokemon.name }
							</Text>
							<Button
								color='gradient'
								ghost={!isInFavorites}
								onPress={ onToggleFavorite } >
								{ isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos' }
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction='row' display='flex' gap={0} css={{ justifyContent: 'space-around' }}>
								<Image src={ pokemon.sprites.front_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image src={ pokemon.sprites.back_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image src={ pokemon.sprites.front_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image src={ pokemon.sprites.back_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>

		</Layout>
	)
}

// ! Se usa para generar los parametros de las rutas dinamicas que vamos a estar pre-creando (Se ejecuta del lado del servidor en build time)
export const getStaticPaths: GetStaticPaths = async (/* ctx */) => {

	// ? Una forma de hacer un array de 151 ids sin tener que usar push y toda la bola
	// ? const pokemons151 = [...Array(151)].map((value, index) => `${ index + 1 }`)
	// ! Pedimos la data, creamos un array de 151 espacios, lo iteramos y le dejas el id adentro
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
	const pokemons151: string[] = data.results.map((pokemonInfo) => `${ pokemonInfo.name.toLowerCase() }`)

	// ! Aca en paths segun la cantidad de params que le cargemos va a ser la cantidad de paginas que va a generar en buildTime
	return {
		paths: pokemons151.map(name => ({
			params: { name: name }
		})),
		fallback: 'blocking'
	}
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

	// ! Arriba destructuramos el ctx y aca el params, una forma de tipar el id sin tener que hacer un tipado gigante arriba en GetStaticProps y mas legible es usando el as
	const { name } = params as { name: string }

	const pokemon = await getPokemonInfo(name.toLowerCase())

	if (!pokemon) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			pokemon,
		},
		revalidate: 86400
	}
}

export default PokemonByNamePage