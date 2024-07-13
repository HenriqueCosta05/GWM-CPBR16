import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../modules/Home';
import MainApp from '../modules/Main';
import CreateUser from '../modules/CreateUser';
import Layout from './Layoute/Layout';
import Login from '../modules/Login';
import RecoverPassword from '../modules/RecoverPassword';
import Request from '../modules/Request';
import Meet from '../modules/Meet';
import Services from '../modules/Services';
import About from '../modules/About';
import { useEffect } from 'react';

//@ts-ignore
const AuthGuard = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const all = localStorage.getItem('all');
		const userRole = localStorage.getItem('userRole');

		if (all && userRole) {
			navigate('/home');
		}
	}, [navigate]);

	return children;
};

export default function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route
					index
					element={
						<AuthGuard>
							<MainApp />
						</AuthGuard>
					}
				/>
				<Route path="/home" element={<Home />} />
				<Route path="/create-user" element={<Layout />}>
					<Route index element={<CreateUser />} />
				</Route>
				<Route path="/about" element={<About />} />
				<Route path="/requests" element={<Services />} />
				<Route path="/request" element={<Request />} />
				<Route path="/services" element={<Services />} />
				<Route path="/meeting" element={<Meet />} />
			</Route>
			<Route path="sign-up" element={<CreateUser />} />
			<Route path="sign-in" element={<Login />} />
			<Route path="recover-password" element={<RecoverPassword />} />
		</Routes>
	);
}
