import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Calendar } from '@/components/calendar'
import { api } from '@/lib/axios'

import {
	Container,
	TimePicker,
	TimePickerHeader,
	TimePickerItem,
	TimePickerList,
} from './styles'

interface Availability {
	possibleTimes: number[]
	availableTimes: number[]
}

interface CalendarStepProps {
	onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	const router = useRouter()
	const username = String(router.query.username)

	const hasSelectedDate = !!selectedDate

	const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
	const stringDate = selectedDate
		? dayjs(selectedDate).format('DD[ de ]MMMM')
		: null

	const selectedDateWithoutTime = selectedDate
		? dayjs(selectedDate).format('YYYY-MM-DD')
		: null

	const { data: availability } = useQuery<Availability>({
		queryKey: ['availability', selectedDateWithoutTime],
		queryFn: async () => {
			const response = await api.get(`/users/${username}/availability`, {
				params: {
					date: selectedDateWithoutTime,
					timezoneOffset: selectedDate ? selectedDate.getTimezoneOffset() : 0,
				},
			})

			return response.data
		},
		enabled: !!selectedDate,
	})

	function handleSelectTime(hour: number) {
		const dateTime = dayjs(selectedDate).set('hour', hour).startOf('hour')

		onSelectDateTime(dateTime.toDate())
	}

	return (
		<Container isTimePickerOpen={hasSelectedDate}>
			<Calendar onDateSelected={setSelectedDate} />

			{hasSelectedDate && (
				<TimePicker>
					<TimePickerHeader>
						{weekDay} <span>{stringDate}</span>
					</TimePickerHeader>

					<TimePickerList>
						{availability?.possibleTimes.map((hour) => (
							<TimePickerItem
								onClick={() => handleSelectTime(hour)}
								disabled={!availability.availableTimes.includes(hour)}
								key={hour}
							>
								{String(hour).padStart(2, '0')}:00h
							</TimePickerItem>
						))}
					</TimePickerList>
				</TimePicker>
			)}
		</Container>
	)
}
