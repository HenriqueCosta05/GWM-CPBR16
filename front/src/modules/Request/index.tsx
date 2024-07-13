import React, { useState, useRef } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputMask from 'react-input-mask';
import { format, parse, isValid } from 'date-fns';
import useHandleSubmit from '../../hooks/useHandleSubmit';

const RequestForm = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);
	const [textDate, setTextDate] = useState('');
	const [textTime, setTextTime] = useState('');
	const datePickerRef = useRef<any>(null);
	const timePickerRef = useRef<any>(null);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setTextDate(date ? format(date, 'dd/MM/yyyy') : '');
	};

	const handleTextDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const dateStr = e.target.value;
		setTextDate(dateStr);

		const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date());
		if (isValid(parsedDate)) {
			setSelectedDate(parsedDate);
		} else {
			setSelectedDate(null);
		}
	};

	const handleTimeChange = (time: Date) => {
		setSelectedTime(time);
		setTextTime(time ? format(time, 'HH:mm') : '');
	};

	const handleTextTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const timeStr = e.target.value;
		setTextTime(timeStr);

		const parsedTime = parse(timeStr, 'HH:mm', new Date());
		if (isValid(parsedTime)) {
			setSelectedTime(parsedTime);
		} else {
			setSelectedTime(null);
		}
	};

	const handleSubmit = useHandleSubmit(
		selectedDate,
		selectedTime,
		textDate,
		textTime
	); // Use o hook

	return (
		<Box
			maxW="md"
			mx="auto"
			mt={10}
			p={6}
			borderWidth={1}
			borderRadius="lg"
			boxShadow="lg"
			bg="white"
			color="black"
		>
			<form onSubmit={handleSubmit}>
				<VStack spacing={4}>
					<FormControl id="date">
						<FormLabel>Data de Atendimento</FormLabel>
						<Box width="100%">
							<DatePicker
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat="dd/MM/yyyy"
								ref={datePickerRef}
								customInput={
									<InputMask
										mask="99/99/9999"
										value={textDate}
										onChange={handleTextDateChange}
										onClick={() => {
											//@ts-ignore
											datePickerRef.current.setOpen(true);
										}}
									>
										{
											//@ts-ignore
											(inputProps) => (
												<Input
													minW={360}
													{...inputProps}
													placeholder="DD/MM/AAAA"
													id="date-input"
												/>
											)
										}
									</InputMask>
								}
							/>
						</Box>
					</FormControl>
					<FormControl id="time">
						<FormLabel>Hora de Atendimento</FormLabel>
						<Box width="100%">
							<DatePicker
								selected={selectedTime}
								onChange={handleTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="Hora"
								dateFormat="HH:mm"
								ref={timePickerRef}
								customInput={
									<InputMask
										mask="99:99"
										value={textTime}
										onChange={handleTextTimeChange}
										onClick={() => {
											//@ts-ignore
											timePickerRef.current.setOpen(true);
										}}
									>
										{
											//@ts-ignore
											(inputProps) => (
												<Input
													{...inputProps}
													minW={360}
													placeholder="HH:MM"
													id="time-input"
												/>
											)
										}
									</InputMask>
								}
							/>
						</Box>
					</FormControl>
					<Button type="submit" colorScheme="blue" width="full">
						Enviar Solicitação
					</Button>
				</VStack>
			</form>
		</Box>
	);
};

export default RequestForm;
