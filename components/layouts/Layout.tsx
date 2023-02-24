import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui';

interface Props {
  children?: React.ReactNode;
	title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

	return (
		<>
			<Head>
				<title>{title || 'PokemonApp'}</title>
				<meta name="author" content="Alejandro Udot"/>
				<meta name="description" content={`Informacion sobre el pokémon ${title}`}/>
				<meta name="keywords" content={`${title}, pokedex, pokemon`}/>
				<meta property="og:title" content={`Informacion sobre ${title}`} />
				<meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
				<meta property="og:image" content={`${origin}/img/banner.png`}/>
			</Head>

			<Navbar/>

			<main style={{
				padding: '0px 80px'
			}}>
				{ children }
			</main>
		</>
	)
}
