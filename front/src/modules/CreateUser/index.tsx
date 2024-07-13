import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
	ChakraProvider,
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormErrorMessage,
} from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router';
import { ArrowLeftIcon } from '@chakra-ui/icons';

type FormValues = {
	firstName: string;
	lastName: string;
	email: string;
	cpf: string;
	cep: string;
};

// Função para validar CPF
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

// Função para validar CEP
const validateCEP = (cep: string) => {
	const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
	return cepRegex.test(cep);
};

const App: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};

	const navigate = useNavigate();

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

					<FormControl id="lastName" isInvalid={!!errors.lastName} mb={4}>
						<FormLabel>Sobrenome</FormLabel>
						<Input
							type="text"
							{...register('lastName', { required: 'Sobrenome é obrigatório' })}
						/>
						<FormErrorMessage>
							{errors.lastName && errors.lastName.message}
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
									message: 'Invalid email address',
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
								required: 'CPF é obrigatório',
								validate: (value) => validateCPF(value) || 'CPF inválido',
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

					<FormControl id="cep" isInvalid={!!errors.cep} mb={4}>
						<FormLabel>CEP</FormLabel>
						<InputMask
							mask="99999-999"
							{...register('cep', {
								required: 'CEP é obrigatório',
								validate: (value) => validateCEP(value) || 'Invalid CEP',
							})}
							onChange={(e) => setValue('cep', e.target.value)}
						>
							{
								//@ts-ignore
								(inputProps: any) => <Input {...inputProps} />
							}
						</InputMask>
						<FormErrorMessage>
							{errors.cep && errors.cep.message}
						</FormErrorMessage>
					</FormControl>

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


//#1D2D44
//#1D2D44
//#0D1321
//#FFCBA4