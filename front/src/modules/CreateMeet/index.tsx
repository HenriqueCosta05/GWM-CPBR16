//@ts-nocheck
import axios from 'axios';

const createGoogleMeet = async ({
	emails,
	date,
	startTime,
	endTime,
	names,
	accessToken,
}) => {
	const attendees = emails.map((email, index) => ({
		email,
		displayName: names[index],
	}));

	const event = {
		summary: 'Reunião de Teste',
		location: 'Google Meet',
		description: 'Discussão sobre o projeto',
		start: {
			dateTime: `${date}T${startTime}:00-03:00`, // Data e hora de início no formato ISO 8601
			timeZone: 'America/Sao_Paulo',
		},
		end: {
			dateTime: `${date}T${endTime}:00-03:00`, // Data e hora de término no formato ISO 8601
			timeZone: 'America/Sao_Paulo',
		},
		attendees,
		conferenceData: {
			createRequest: {
				conferenceSolutionKey: {
					type: 'hangoutsMeet',
				},
				requestId: 'randomString',
			},
		},
		reminders: {
			useDefault: false,
			overrides: [
				{ method: 'email', minutes: 24 * 60 },
				{ method: 'popup', minutes: 10 },
			],
		},
	};

	try {
		const response = await axios.post(
			'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
			event,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data.hangoutLink;
	} catch (error) {
		console.error('Error creating meeting:', error);
		throw error;
	}
};

export default createGoogleMeet;
