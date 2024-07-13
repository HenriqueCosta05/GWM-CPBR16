import { Flex, HStack, VStack, Image, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import texto01 from './images/texto-01.svg';
import texto02 from './images/texto-02.svg';

import image01 from './images/dado-01.svg';
import image02 from './images/img-01.svg';
import image03 from './images/img-02.svg';
import image04 from './images/dado-02.svg';
import image05 from './images/card-01.svg';
import image06 from './images/card-02.svg';
import image07 from './images/card-03.svg';
import image08 from './images/card-04.svg';
import image09 from './images/card-05.svg';
import image10 from './images/card-06.svg';

const Home: React.FC = () => {
	const [isMobile] = useMediaQuery('(max-width: 48em)'); // 48em is equivalent to 768px

	return (
		<Flex width="100%" id="naFlex" justify="center" direction="column">
			<VStack
				height="100%"
				justifyContent="start"
				alignItems="start"
				p={6}
				maxW="900px"
				mx="auto"
			>
				<Image mt={6} width="50%" src={image01} alt="Logo" />
				<HStack w="100%" spacing={6} mt={6}>
					<Image w={'80%'} src={texto01} alt="Logo" />
					<Image
						w={'20%'}
						src={image02}
						alt="Logo"
						style={{ alignSelf: 'center' }}
					/>
				</HStack>
				<HStack
					w="100%"
					alignItems="start"
					justifyContent={'center'}
					spacing={6}
					mt={20}
					mb={20}
				>
					<Image
						w={'30%'}
						minWidth="10px"
						src={image03}
						alt="Logo"
						style={{ alignSelf: 'center' }}
					/>
					<Image w={'70%'} minW={'250px'} src={texto02} alt="Logo" />
				</HStack>
				<Image w={'50%'} mt={6} src={image04} alt="Logo" />
			</VStack>
			<VStack alignSelf="center" maxW="900px" w="100%" mt={isMobile ? 4 : 20}>
				<Flex w="100%" justify="space-between">
					<Image
						maxWidth={isMobile ? '180px' : '400px'}
						alignSelf="flex-start"
						src={image05}
						alt="Logo"
					/>
					<Image
						mt={isMobile ? 120 : 200}
						maxWidth={isMobile ? '180px' : '400px'}
						alignSelf="flex-end"
						src={image06}
						alt="Logo"
					/>
				</Flex>
				<Flex w="100%" justify="space-between" mt={isMobile ? 0 : 6}>
					<Image
						mt={isMobile ? 6 : 10}
						maxWidth={isMobile ? '180px' : '400px'}
						alignSelf="flex-start"
						src={image07}
						alt="Logo"
					/>
					<Image
						mt={isMobile ? 100 : 200}
						maxWidth={isMobile ? '180px' : '400px'}
						alignSelf="flex-end"
						src={image08}
						alt="Logo"
					/>
				</Flex>
				<HStack
					w="100%"
					justify="center"
					alignItems={'center'}
					mt={isMobile ? 4 : 6}
				>
					<Image
						maxWidth={isMobile ? '180px' : '400px'}
						alignSelf="flex-start"
						src={image09}
						alt="Logo"
					/>
					<Image
						maxWidth={isMobile ? '180px' : '400px'}
						alignSelf="center"
						src={image10}
						alt="Logo"
					/>
				</HStack>
			</VStack>
		</Flex>
	);
};

export default Home;
