import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
	margin: '$6 auto 0',
	padding: 0,
	display: 'grid',
	position: 'relative',

	variants: {
		isTimePickerOpen: {
			true: {
				gridTemplateColumns: '1fr 280px',
				'@media (max-width:900px)': {
					gridTemplateColumns: '1fr',
				},
			},
			false: {
				width: 540,
				gridTemplateColumns: '1fr',
			},
		},
	},

	'@media (max-width:900px)': {
		display: 'block',
		maxWidth: 540,
	},
})

export const TimePicker = styled('div', {
	padding: 0,

	'@media (min-width:901px)': {
		borderLeft: '1px solid $gray600',
		overflowY: 'scroll',
		position: 'absolute',
		inset: '0 0 0 auto',
		width: 280,
	},

	'@media (max-width:900px)': {
		paddingBottom: '$6',
		borderTop: '1px solid $gray600',
	},
})

export const TimePickerHeader = styled(Text, {
	position: 'sticky',
	top: 0,
	padding: '$6 $6 0',
	marginBottom: '$6',
	background: '$gray800',
	fontWeight: '$medium',
	borderTopRightRadius: '$sm',
	zIndex: 1,

	span: {
		color: '$gray200',
	},

	'&:before': {
		content: '',
		position: 'absolute',
		inset: '100% 0 auto',
		display: 'block',
		height: '$6',
		background:
			'linear-gradient(to bottom, $colors$gray800 0%, $colors$gray800 33%, transparent 100%)',
	},
})

export const TimePickerList = styled('div', {
	padding: '0 $6',
	display: 'grid',
	gridTemplateColumns: '1fr',
	gap: '$2',

	'@media (max-width:900px)': {
		gridTemplateColumns: '1fr 1fr 1fr',
	},

	'@media (max-width:600px)': {
		gridTemplateColumns: '1fr 1fr',
	},
})

export const TimePickerItem = styled('button', {
	border: 0,
	background: '$gray600',
	padding: '$2 0',
	cursor: 'pointer',
	color: '$gray100',
	borderRadius: '$sm',
	fontSize: '$sm',
	lineHeight: '$base',

	'@media (min-width:901px)': {
		'&:last-child': {
			marginBottom: '$6',
		},
	},

	'&:disabled': {
		cursor: 'default',
		background: 'none',
		opacity: '0.4',
	},

	'&:not(:disabled):hover': {
		background: '$gray500',
	},

	'&:focus-visible': {
		boxShadow: '0 0 0 2px $colors$gray100',
	},
})
