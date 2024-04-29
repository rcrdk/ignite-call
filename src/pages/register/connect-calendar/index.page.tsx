import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { Check } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

import { ButtonLoading } from '@/styles/global'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const session = useSession()

	const hasAuthError = !!router.query.error
	const hasSignedIn = session.status === 'authenticated'

	async function handleConnectCalendar() {
		await signIn('google')
	}

	async function handleNavigateToNextStep() {
		setIsLoading(true)

		await router.push('/register/time-intervals')
	}

	return (
		<>
			<NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />

			<Container>
				<Header>
					<Heading as="strong">Conecte sua agenda!</Heading>
					<Text>
						Conecte o seu calendário para verificar automaticamente as horas
						ocupadas e os novos eventos à medida em que são agendados.
					</Text>

					<MultiStep size={4} currentStep={2}></MultiStep>

					<ConnectBox>
						<ConnectItem>
							<Text>Google Calendar</Text>
							{hasSignedIn ? (
								<Button size="sm" disabled>
									Conectado
									<Check />
								</Button>
							) : (
								<Button
									variant="secondary"
									size="sm"
									onClick={handleConnectCalendar}
								>
									Conectar
									<ArrowRight />
								</Button>
							)}
						</ConnectItem>

						{hasAuthError && (
							<AuthError size="sm">
								Falha ao conectar ao Google, verifique se você habilitou as
								permissões de acesso ao Google Calendar.
							</AuthError>
						)}

						<Button
							type="submit"
							onClick={handleNavigateToNextStep}
							disabled={!hasSignedIn || isLoading}
						>
							Próximo passo
							<ArrowRight />
							{isLoading && <ButtonLoading />}
						</Button>
					</ConnectBox>
				</Header>
			</Container>
		</>
	)
}
