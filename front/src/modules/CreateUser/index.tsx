import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
	ChakraProvider,
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormErrorMessage,
	Checkbox,
	CheckboxGroup,
	Stack,
	Select,
} from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import baseApi from '../../common/api';

type FormValues = {
	firstName: string;
	surname: string;
	email: string;
	cpf?: string;
	zip?: string;
	password: string;
	userRole: string;
	availableDays: string[];
};

const validateCPF = (cpf: string) => {
	cpf = cpf.replace(/[^\d]+/g, '');
	if (cpf.length !== 11) return false;
	let sum = 0;
	let remainder;
	for (let i = 1; i <= 9; i++) {
		sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(cpf.substring(9, 10))) return false;
	sum = 0;
	for (let i = 1; i <= 10; i++) {
		sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(cpf.substring(10, 11))) return false;
	return true;
};

const validateCEP = (cep: string) => {
	const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
	return cepRegex.test(cep);
};

const daysOfWeek = [
	{ pt: 'Segunda-feira', en: 'Monday' },
	{ pt: 'Terça-feira', en: 'Tuesday' },
	{ pt: 'Quarta-feira', en: 'Wednesday' },
	{ pt: 'Quinta-feira', en: 'Thursday' },
	{ pt: 'Sexta-feira', en: 'Friday' },
	{ pt: 'Sábado', en: 'Saturday' },
	{ pt: 'Domingo', en: 'Sunday' },
];

const App: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<FormValues>();

	const cleanData = (data: any) => {
		return Object.entries(data).reduce((acc, [key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				acc[key] = value;
			}
			return acc;
		}, {} as any);
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		// Map days of the week to English
		const availableDaysInEnglish = data.availableDays
			? data.availableDays.map(
					(day) => daysOfWeek.find((d) => d.pt === day)?.en
			  )
			: undefined;

		// Adjust userRole values
		const adjustedUserRole = data.userRole === 'yes' ? 'VOLUNTEER' : 'COMMON';
		const dataToSend = {
			...data,
			userRole: adjustedUserRole,
			schedule: availableDaysInEnglish,
		};

		const cleanedData = cleanData(dataToSend);
		console.log('cleanedData', cleanedData);

		const res = await baseApi.post('user', cleanedData);
		if (res.status >= 200 && res.status <= 300) {
			navigate('/sign-in');
		}
	};

	const navigate = useNavigate();
	const [isVolunteer, setIsVolunteer] = useState(false);

	const userRoleWatch = watch('userRole');

	useEffect(() => {
		setIsVolunteer(userRoleWatch === 'yes');
	}, [userRoleWatch]);

	return (
		<ChakraProvider>
			<Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl id="firstName" isInvalid={!!errors.firstName} mb={4}>
						<FormLabel>Primeiro Nome</FormLabel>
						<Input
							type="text"
							{...register('firstName', {
								required: 'Primeiro nome é obrigatório',
							})}
						/>
						<FormErrorMessage>
							{errors.firstName && errors.firstName.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl id="surname" isInvalid={!!errors.surname} mb={4}>
						<FormLabel>Sobrenome</FormLabel>
						<Input
							type="text"
							{...register('surname', { required: 'Sobrenome é obrigatório' })}
						/>
						<FormErrorMessage>
							{errors.surname && errors.surname.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl id="email" isInvalid={!!errors.email} mb={4}>
						<FormLabel>E-mail</FormLabel>
						<Input
							type="email"
							{...register('email', {
								required: 'Email é obrigatório',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Endereço de e-mail inválido',
								},
							})}
						/>
						<FormErrorMessage>
							{errors.email && errors.email.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl id="cpf" isInvalid={!!errors.cpf} mb={4}>
						<FormLabel>CPF</FormLabel>
						<InputMask
							mask="999.999.999-99"
							{...register('cpf', {
								validate: (value) =>
									!value || validateCPF(value) || 'CPF inválido',
							})}
							onChange={(e) => setValue('cpf', e.target.value)}
						>
							{
								//@ts-ignore
								(inputProps: any) => <Input {...inputProps} />
							}
						</InputMask>
						<FormErrorMessage>
							{errors.cpf && errors.cpf.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl id="zip" isInvalid={!!errors.zip} mb={4}>
						<FormLabel>CEP</FormLabel>
						<InputMask
							mask="99999-999"
							{...register('zip', {
								validate: (value) =>
									!value || validateCEP(value) || 'CEP inválido',
							})}
							onChange={(e) => setValue('zip', e.target.value)}
						>
							{
								//@ts-ignore
								(inputProps: any) => <Input {...inputProps} />
							}
						</InputMask>
						<FormErrorMessage>
							{errors.zip && errors.zip.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl id="password" isInvalid={!!errors.password} mb={4}>
						<FormLabel>Senha</FormLabel>
						<Input
							type="password"
							{...register('password', {
								required: 'Senha é obrigatória',
								minLength: {
									value: 6,
									message: 'Senha deve ter no mínimo 6 caracteres',
								},
							})}
						/>
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl id="userRole" isInvalid={!!errors.userRole} mb={4}>
						<FormLabel>Você é voluntário?</FormLabel>
						<Select
							{...register('userRole', { required: 'Campo obrigatório' })}
							onChange={(e) => {
								setValue('userRole', e.target.value);
								setIsVolunteer(e.target.value === 'yes');
							}}
						>
							<option value="">Selecione...</option>
							<option value="yes">Sim</option>
							<option value="no">Não</option>
						</Select>
						<FormErrorMessage>
							{errors.userRole && errors.userRole.message}
						</FormErrorMessage>
					</FormControl>

					{isVolunteer && (
						<FormControl
							id="availableDays"
							isInvalid={!!errors.availableDays}
							mb={4}
						>
							<FormLabel>Dias da semana disponíveis</FormLabel>
							<CheckboxGroup colorScheme="teal">
								<Stack spacing={2} direction="column">
									{daysOfWeek.map((day) => (
										<Checkbox
											key={day.pt}
											value={day.pt}
											{...register('availableDays')}
										>
											{day.pt}
										</Checkbox>
									))}
								</Stack>
							</CheckboxGroup>
							<FormErrorMessage>
								{errors.availableDays && errors.availableDays.message}
							</FormErrorMessage>
						</FormControl>
					)}

					<Button type="submit" colorScheme="teal" size="lg" mt={4} w={'100%'}>
						Cadastrar
					</Button>
					<Button mt={4} w={'100%'} onClick={() => navigate(-1)}>
						<ArrowLeftIcon maxW={3} mr={2} /> Voltar
					</Button>
				</form>
			</Box>
		</ChakraProvider>
	);
};

export default App;
