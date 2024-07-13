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
	Link,
	Flex,
	useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { ArrowLeftIcon, ChevronLeftIcon } from '@chakra-ui/icons';

type FormValues = {
	email: string;
	password: string;
};

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
	};

	const navigate = useNavigate();

	return (
		<Flex
			minH="100vh"
			minW={'auto'}
			align="center"
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<div
				style={{
					width: 40,
					height: 40,
					position: 'fixed',
					top: 20,
					left: 20,
					borderRadius: 4,
					padding: 2,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer',
					boxShadow: '0px 0px 4px #BEB8B8',
				}}
				onClick={() => navigate(-1)}
			>
				<ChevronLeftIcon w={4} h={4} />
			</div>
			<Box
				w="md"
				mx="auto"
				p={5}
				borderWidth={1}
				borderRadius="lg"
				bg={useColorModeValue('white', 'gray.700')}
			>
				<Heading
					mb={6}
					textAlign="center"
					justifyContent={'center'}
					alignItems={'center'}
					display={'flex'}
					marginTop={'10'}
					marginBottom={'10'}
				>
					<img
						src={logo}
						alt="Logo"
						style={{ maxHeight: '100px', alignSelf: 'auto' }}
					/>
				</Heading>
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

						<FormControl id="password" isInvalid={!!errors.password}>
							<FormLabel>Senha</FormLabel>
							<Input
								type="password"
								{...register('password', {
									required: 'Password is required',
								})}
							/>
							<FormErrorMessage>
								{errors.password && errors.password.message}
							</FormErrorMessage>
						</FormControl>

						<Button type="submit" colorScheme="teal" size="lg" fontSize="md">
							Entrar
						</Button>

						<Link
							as={RouterLink}
							to="/recover-password"
							color="teal.500"
							textAlign="center"
						>
							Perdeu sua senha?
						</Link>
					</Stack>
				</form>
			</Box>
		</Flex>
	);
};

export default Login;
