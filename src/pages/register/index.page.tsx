import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/lib/axios'

import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'O usuário deve conter ao menos 3 letras.' })
		.regex(/^([a-z\\\\-]+)$/i, {
			message: 'O usuário deve conter apenas letras a hifens.',
		})
		.transform((username) => username.toLocaleLowerCase()),
	name: z.string().min(3, { message: 'O nome deve conter ao menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
	})

	const router = useRouter()

	useEffect(() => {
		if (router.query?.username) {
			setValue('username', String(router.query.username))
		}
	}, [router.query.username, setValue])

	async function handleRegister(data: RegisterFormData) {
		try {
			await api.post('/users', {
				name: data.name,
				username: data.username,
			})

			await router.push('/register/connect-calendar')
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data.message) {
				alert(error.response.data.message)
				return
			}

			console.error(error)
		}
	}

	return (
		<Container>
			<Header>
				<Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
				<Text>
					Precisamos de algumas informações para criar seu perfil! Ah, você pode
					editar essas informações depois.
				</Text>

				<MultiStep size={4} currentStep={1}></MultiStep>
			</Header>

			<Form as="form" onSubmit={handleSubmit(handleRegister)}>
				<label>
					<Text size="sm">Nome de usuário</Text>
					<TextInput
						prefix="ignite.com/"
						placeholder="seu-usuario"
						{...register('username')}
					/>
					{errors.username && (
						<FormError size="sm">{errors.username.message}</FormError>
					)}
				</label>

				<label>
					<Text size="sm">Nome completo</Text>
					<TextInput placeholder="Seu nome" {...register('name')} />
					{errors.name && (
						<FormError size="sm">{errors.name.message}</FormError>
					)}
				</label>

				<Button type="submit" disabled={isSubmitting}>
					Próximo passo
					<ArrowRight />
				</Button>
			</Form>
		</Container>
	)
}
