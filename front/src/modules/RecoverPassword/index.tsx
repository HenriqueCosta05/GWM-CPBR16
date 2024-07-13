import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	FormErrorMessage,
	Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { ArrowLeftIcon } from '@chakra-ui/icons';

type FormValues = {
	email: string;
};

const RecoverPassword: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};

	return (
		<Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
			<Heading mb={6}>Recuperar Senha</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4}>
					<FormControl id="email" isInvalid={!!errors.email}>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							{...register('email', {
								required: 'Email is required',
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

					<Button type="submit" colorScheme="teal" size="lg" fontSize="md">
						Recuperar Senha
					</Button>
					<Button w={'100%'} onClick={() => navigate(-1)}>
						<ArrowLeftIcon maxW={3} mr={2} /> Voltar
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default RecoverPassword;
