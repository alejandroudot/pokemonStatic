import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"

export const Navbar = () => {

	const { theme } = useTheme()

	return (
		<div style={{
			display: 'flex',
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'start',
			padding: '0 20px',
			backgroundColor: theme?.colors.gray200.value
		}}>
			<Link href="/pokemon/5">
				<Image
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
					alt="icono de la app"
					width={70}
					height={70}
					priority
				/>
			</Link>
			<Link href="/">
				<Text color="white" h2>P</Text>
				<Text color="white" h3>okemon</Text>
			</Link>
			<Spacer css={{ flex: 1 }} />
			<Link href="/favorites">
				<Text color="white" >Favoritos</Text>
			</Link>
		</div>
	)
}
