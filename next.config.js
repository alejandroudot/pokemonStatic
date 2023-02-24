/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// ! Le avisamos los dominions de los cuales permitimos tomar imagenes
		domains: ['raw.githubusercontent.com']
	}
}

module.exports = nextConfig
