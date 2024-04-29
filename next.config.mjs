/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
	modularizeImports: {
		'@phosphor-icons/react': {
			transform: '@phosphor-icons/react/dist/ssr{{member}}',
		},
	},
}

export default nextConfig
