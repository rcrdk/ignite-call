import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import previewImage from '@/assets/app-preview.png'

import { ClaimUsernameForm } from './components/claim-username-form'
import { Container, Hero, Preview } from './styles'

export default function Home() {
	return (
		<>
			<NextSeo
				title="Descomplique a sua agenda | Ignite Call"
				description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
			/>

			<Container>
				<Hero>
					<Heading as="h1" size="4xl">
						Agendamento descomplicado
					</Heading>
					<Text size="xl">
						Conecte seu calendário e permita que as pessoas marquem agendamentos
						no seu tempo livre.{' '}
						<Link
							href={`${process.env.NEXTAUTH_URL}/schedule/rcrdk`}
							target="_blank"
						>
							Teste agora!
						</Link>
					</Text>
					<ClaimUsernameForm />
				</Hero>

				<Preview>
					<Image
						src={previewImage}
						alt="Calendário simbolizando a aplicação em funcionamento"
						height={400}
						quality={100}
						priority
					/>
				</Preview>
			</Container>
		</>
	)
}
