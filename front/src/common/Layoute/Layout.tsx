// components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../compnents/NavBar';
import logo from '../../assets/logo.png';
import florzinha from '../../assets/florzinhas.svg';
import { Text, VStack } from '@chakra-ui/react';
import footer from '../../assets/Obstare ao seu lado © 2024.svg';

const Footer = () => {
	return (
		<div
			style={{
				border: '3px solid black',
				borderLeft: 'none',
				borderRight: 'none',
				padding: 14,
				marginTop: 20,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<img src={logo} alt="Logo" style={{ maxHeight: '40px' }} />
			<VStack align={'flex-start'} marginLeft={10}>
				<Text>contato@obstare.com.br</Text>
				<Text>+55 19 9123-4567</Text>
			</VStack>
			<VStack align={'flex-start'} marginLeft={10} width={'100%'}>
				<Text>Obstare ao seu lado © 2024</Text>
			</VStack>
			<div
				style={{
					alignSelf: 'flex-end',
					justifySelf: 'flex-end',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<img
					src={florzinha}
					alt="Logo"
					style={{
						maxHeight: '90px',
						alignSelf: 'flex-end',
						justifySelf: 'end',
					}}
				/>
			</div>
		</div>
	);
};
const Layout: React.FC = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			{/* <Footer /> */}
			<img src={footer} />
		</>
	);
};

export default Layout;
