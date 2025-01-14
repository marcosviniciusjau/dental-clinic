import { Calendar } from "@/src/components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import { useState } from "react";
import dayjs from "dayjs";
import { api } from "@/src/lib/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { FormActions } from "./styles";
import { Button } from "@marcos-vinicius-design-system/react";

export interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

interface CalendarStepProps {
  onSelectedTime: (date: Date) => void;
}

export function CalendarStep({ onSelectedTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  const isDateSelected = !!selectedDate;
  const email = String(router.query.email);

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;

  const describedDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;

  const { data: availability } = useQuery<Availability>({
    queryKey: ["availability", selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${email}/availability`, {
        params: {
          date: selectedDateWithoutTime,
          timezoneOffset: selectedDate ? selectedDate.getTimezoneOffset() : 0,
        },
      });

      return response.data;
    },
    enabled: !!selectedDate,
  });

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set("hour", hour)
      .startOf("hour")
      .toDate();

    onSelectedTime(dateWithTime);
  }


  function onCancelConfirmation(){
   setSelectedDate(null)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar 
      availability={availability}
      selectedDate={selectedDate} 
      onDateSelected={setSelectedDate} 
      />
    
      {isDateSelected && (
        <TimePicker>
            <FormActions>
              <Button
                type="button"
                variant="tertiary"
                onClick={onCancelConfirmation}
              >
                Cancelar
              </Button>
            </FormActions>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => {
                    handleSelectTime(hour);
                  }}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, "0")}:00h
                </TimePickerItem>
              );
            })}
          
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
