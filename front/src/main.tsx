import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@radix-ui/themes/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
// import theme from './common/theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ChakraProvider
		// theme={theme}
		>
			<App />
		</ChakraProvider>
	</BrowserRouter>
);
