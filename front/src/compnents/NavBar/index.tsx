import React from 'react';
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	useDisclosure,
	useColorModeValue,
	Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-small.png';

const Links = [
	{ name: 'Home', path: '/home' },
	{ name: 'Sobre nós', path: '/about' },
	{ name: 'Solicitações', path: '/requests' },
	{ name: 'Solicitar', path: '/request' },
	{ name: 'Atendimentos', path: '/services' },
	{ name: 'Meet', path: '/meeting' },
];

const NavLink = ({ name, path }: { name: string; path: string }) => (
	<RouterLink to={path}>
		<Box
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
		>
			{name}
		</Box>
	</RouterLink>
);

const Navbar: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();

	const handleClickLogo = () => navigate('/');

	return (
		<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<IconButton
					size={'md'}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={'Open Menu'}
					display={{ md: 'none' }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={'center'}>
					<Box w={'12'} onClick={handleClickLogo} cursor={'pointer'}>
						<img src={logo} alt="Logo" />
					</Box>
					<HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
						{Links.map((link) => (
							<NavLink key={link.name} name={link.name} path={link.path} />
						))}
					</HStack>
				</HStack>
				<Flex alignItems={'center'}>
					<Button
						variant={'solid'}
						colorScheme={'teal'}
						size={'sm'}
						mr={4}
						onClick={() => navigate('/sign-up')}
						// onClick={() => {
						// 	const eventTitle = 'Meeting with John';
						// 	const startDate = '20240725T150000Z'; // Start date and time in UTC
						// 	const endDate = '20240725T160000Z'; // End date and time in UTC
						// 	const description =
						// 		'Discuss project details. Join the meeting here: http://meet.jit.si/obstar-e';
						// 	const location = 'Office';

						// 	const googleCalendarLink = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
						// 		eventTitle
						// 	)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
						// 		description
						// 	)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

						// 	console.log(googleCalendarLink);

						// }}
					>
						Cadastrar
					</Button>
					<Button onClick={() => navigate('/sign-in')} size={'sm'}>
						Entrar
					</Button>
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4}>
						{Links.map((link) => (
							<NavLink key={link.name} name={link.name} path={link.path} />
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};

export default Navbar;
