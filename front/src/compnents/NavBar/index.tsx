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
	{ name: 'Solicitações', path: '/requests', role: 'VOLUNTEER' },
	{ name: 'Solicitar', path: '/request' },
	{ name: 'Atendimentos', path: '/services', role: 'VOLUNTEER' },
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

	const handleLogout = () => {
		localStorage.clear();
		navigate('/sign-in');
	};

	const userRole = localStorage.getItem('userRole');
	const isAuthenticated =
		localStorage.getItem('all') !== null && userRole !== null;

	const filteredLinks = isAuthenticated
		? Links.filter((link) => !link.role || link.role === userRole)
		: Links.filter((link) => link.name === 'Home' || link.name === 'Sobre nós');

	return (
		<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} w={'100%'}>
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
						{filteredLinks.map((link) => (
							<NavLink key={link.name} name={link.name} path={link.path} />
						))}
					</HStack>
				</HStack>
				<Flex alignItems={'center'}>
					{isAuthenticated ? (
						<Button
							variant={'solid'}
							colorScheme={'teal'}
							size={'sm'}
							mr={4}
							onClick={handleLogout}
						>
							Sair
						</Button>
					) : (
						<>
							<Button
								variant={'solid'}
								colorScheme={'teal'}
								size={'sm'}
								mr={4}
								onClick={() => navigate('/sign-up')}
							>
								Cadastrar
							</Button>
							<Button onClick={() => navigate('/sign-in')} size={'sm'}>
								Entrar
							</Button>
						</>
					)}
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4}>
						{filteredLinks.map((link) => (
							<NavLink key={link.name} name={link.name} path={link.path} />
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};

export default Navbar;
