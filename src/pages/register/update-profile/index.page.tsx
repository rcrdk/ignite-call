import { zodResolver } from '@hookform/resolvers/zod'
import {
	Avatar,
	Button,
	Heading,
	MultiStep,
	Text,
	TextArea,
} from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/lib/axios'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { ButtonLoading } from '@/styles/global'

import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
	bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
	const router = useRouter()
	const session = useSession()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<UpdateProfileFormData>({
		resolver: zodResolver(updateProfileFormSchema),
	})

	async function handleUpdateProfile(data: UpdateProfileFormData) {
		await api.put('/users/update-profile', {
			bio: data.bio,
		})

		await router.push(`/schedule/${session.data?.user.username}`)
	}

	return (
		<>
			<NextSeo title="Atualize seu perfil | Ignite Call" noindex />

			<Container>
				<Header>
					<Heading as="strong">Finalize seu perfil!</Heading>
					<Text>Por último, uma breve descrição e uma foto de perfil.</Text>

					<MultiStep size={4} currentStep={4}></MultiStep>
				</Header>

				<ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
					<label>
						<Text size="sm">Foto de perfil</Text>
						<Avatar
							src={session.data?.user.avatar_url}
							alt={session.data?.user.name}
						/>
					</label>

					<label>
						<Text size="sm">Sobre você</Text>
						<TextArea {...register('bio')} />
						<FormAnnotation size="sm">
							Fale um pouco sobre você. Isto será exibido em sua página pessoal.
						</FormAnnotation>
					</label>

					<Button type="submit" disabled={isSubmitting}>
						Finalizar
						<ArrowRight />
						{isSubmitting && <ButtonLoading />}
					</Button>
				</ProfileBox>
			</Container>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(
		req,
		res,
		buildNextAuthOptions(req, res),
	)

	return {
		props: {
			session,
		},
	}
}
