import { Calendar } from '@/src/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/src/lib/axios'
import { useRouter } from 'next/router'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null

  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (!selectedDate) {
      return
    }
    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        console.log(response.data)
      })
  }, [selectedDate, username])
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>08:00</TimePickerItem>

            <TimePickerItem>09:00</TimePickerItem>

            <TimePickerItem>10:00</TimePickerItem>

            <TimePickerItem>11:00</TimePickerItem>

            <TimePickerItem>12:00</TimePickerItem>

            <TimePickerItem>13:00</TimePickerItem>

            <TimePickerItem>14:00</TimePickerItem>

            <TimePickerItem>15:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
