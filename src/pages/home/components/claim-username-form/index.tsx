import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonLoading } from '@/styles/global'

import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'O usuário deve conter ao menos 3 letras.' })
		.regex(/^([a-z\\\\-]+)$/i, {
			message: 'O usuário deve conter apenas letras a hifens.',
		})
		.transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ClaimUsernameFormData>({
		resolver: zodResolver(claimUsernameFormSchema),
	})

	async function handleClaimUsername({ username }: ClaimUsernameFormData) {
		await router.push(`/register?username=${username}`)
	}

	return (
		<>
			<Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
				<TextInput
					size="sm"
					prefix="ignite.com/"
					placeholder="seu-usuario"
					{...register('username')}
				/>
				<Button size="sm" type="submit" disabled={isSubmitting}>
					Reservar usuário
					<ArrowRight />
					{isSubmitting && <ButtonLoading />}
				</Button>
			</Form>

			<FormAnnotation>
				<Text size="sm">
					{errors.username?.message ?? 'Digite o nome do usuário desejado'}
				</Text>
			</FormAnnotation>
		</>
	)
}
