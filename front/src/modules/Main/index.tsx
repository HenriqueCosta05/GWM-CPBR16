import { Flex, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

function MainApp() {
	const navigation = useNavigate();

	const handleHome = () => {
		navigation('/home');
	};

	return (
		<Flex direction="column" gap="2">
			<Text className="bg-red-500">main</Text>
			<Button onClick={() => handleHome()}>ir para home</Button>
		</Flex>
	);
}

export default MainApp;
