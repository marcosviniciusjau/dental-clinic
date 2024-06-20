import { Calendar } from '@/src/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
export function CalendarStep() {
  const isDateSelected = false

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            Terça-feira <span>20 de setembro</span>
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
