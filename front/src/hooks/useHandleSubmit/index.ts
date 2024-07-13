import { useToast } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useCallback } from 'react';

const useHandleSubmit = (selectedDate: Date | null, selectedTime: Date | null, textDate: string, textTime: string, atendidoEmail?: string) => {
    const toast = useToast();

    return useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) {
            toast({
                title: 'Erro',
                description: 'Por favor, selecione uma data e hora válidas.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const eventTitle = 'Atendimento - Cuidados na gravidez';
        const startDate =
            format(selectedDate, 'yyyyMMdd') +
            'T' +
            format(selectedTime, "HHmmss'Z'"); // Format date and time to UTC string
        const endDate =
            format(selectedDate, 'yyyyMMdd') +
            'T' +
            format(selectedTime, "HHmmss'Z'"); // Same end date for a 1-hour meeting
        const description =
            'Atendimento referente a cuidados na gravidez.';
        const location = 'Office';
        const guestEmail = atendidoEmail ?? "";

        const googleCalendarLink = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
            eventTitle
        )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
            description
        )}&location=${encodeURIComponent(
            location
        )}&add=conference&conference=hangoutsMeet&add=${encodeURIComponent(
            guestEmail
        )}&sf=true&output=xml`;

        console.log("googleCalendarLink:", googleCalendarLink);

        // Open the Google Calendar link in a new tab
        window.open(googleCalendarLink, '_blank');

        toast({
            title: 'Solicitação enviada.',
            description: `Data de atendimento: ${textDate} às ${textTime}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    }, [selectedDate, selectedTime, textDate, textTime, toast]);
};

export default useHandleSubmit;
