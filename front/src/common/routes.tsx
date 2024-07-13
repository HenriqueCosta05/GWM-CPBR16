import { Routes, Route } from 'react-router-dom';
import Home from '../modules/Home';
import MainApp from '../modules/Main';
import CreateUser from '../modules/CreateUser';
import Layout from './Layoute/Layout';
import Navbar from '../components/NavBar';
import Login from '../modules/Login';
import RecoverPassword from '../modules/RecoverPassword';
import Request from '../modules/Request';
import JitsiMeeting from '../compnents/JitsyMeeting';
import Meet from '../modules/Meet';

export default function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<MainApp />} />
				<Route path="/home" element={<Home />} />
				<Route path="/create-user" element={<Layout />}>
					<Route index element={<CreateUser />} />
				</Route>
				<Route path="/about" element={<div>About Us</div>} />
				<Route path="/requests" element={<div>Requests</div>} />
				<Route path="/request" element={<Request />} />
				<Route path="/services" element={<div>Services</div>} />
				<Route path="/meeting" element={<Meet />} />
			</Route>
			<Route path="sign-up" element={<CreateUser />} />
			<Route path="sign-in" element={<Login />} />
			<Route path="recover-password" element={<RecoverPassword />} />
		</Routes>
	);
}
