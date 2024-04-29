import { globalCss, keyframes, styled } from '@ignite-ui/react'
import { Spinner } from '@phosphor-icons/react'

export const pulseAnimation = keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.33 },
})

export const loadingAnimation = keyframes({
	from: { transform: 'rotate(0deg)' },
	to: { transform: 'rotate(360deg)' },
})

export const ButtonLoading = styled(Spinner, {
	position: 'absolute',
	animation: `${loadingAnimation} 1500ms linear 0ms infinite`,
	width: `$6 !important`,
	height: `$6 !important`,
	color: '$white',
})

export const globalStyles = globalCss({
	'*': {
		boxSizing: 'border-box',
		padding: 0,
		margin: 0,
	},

	body: {
		backgroundColor: '$gray900',
		color: '$gray100',
		'-webkit-font-smoothing': 'antialiased',
	},

	button: {
		[`&:has(${ButtonLoading})`]: {
			color: 'transparent',
		},
	},
})
