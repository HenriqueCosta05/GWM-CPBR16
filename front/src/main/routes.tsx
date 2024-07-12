// React Router v6
import { Routes, Route } from 'react-router-dom';
import Home from '../modules/Home';
import MainApp from '../modules/Main';
export default function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<MainApp />} />
			<Route path="/home" element={<Home />} />
		</Routes>
	);
}
