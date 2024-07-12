import { Flex, Text, Button, TabNav } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

function MainApp() {
	const navigation = useNavigate();

	const handleHome = () => {
		navigation('/home');
	};

	return (
		<TabNav.Root>
			<TabNav.Link href="#" active>
				Account
			</TabNav.Link>
			<TabNav.Link href="/home">Documents</TabNav.Link>
			<TabNav.Link href="#">Settings</TabNav.Link>
		</TabNav.Root>
	);
}

export default MainApp;
