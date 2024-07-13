// src/components/JitsiMeeting.js
import { Button } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const JitsiMeeting = ({
	domain = 'meet.jit.si',
	roomName,
	configOverwrite = {},
	interfaceConfigOverwrite = {},
	userInfo = {},
	onApiReady = () => {},
	getIFrameRef = () => {},
}) => {
	const jitsiContainerRef = useRef(null);
	const [meetingLink, setMeetingLink] = useState('');

	useEffect(() => {
		if (jitsiContainerRef.current) {
			const options = {
				roomName,
				width: '100%',
				height: 600,
				parentNode: jitsiContainerRef.current,
				configOverwrite,
				interfaceConfigOverwrite,
				userInfo,
			};
			const api = new window.JitsiMeetExternalAPI(domain, options);

			api.addEventListener('videoConferenceJoined', () => {
				console.log('Local User Joined');
				setMeetingLink(`https://${domain}/${roomName}`);
			});

			onApiReady(api);

			return () => api.dispose();
		}
	}, [
		roomName,
		domain,
		configOverwrite,
		interfaceConfigOverwrite,
		userInfo,
		onApiReady,
	]);

	const copyMeetingLink = () => {
		navigator.clipboard.writeText(meetingLink).then(() => {
			alert(`Link da reunião copiado: ${meetingLink}`);
		});
	};

	useEffect(() => {
		if (jitsiContainerRef.current) {
			getIFrameRef(jitsiContainerRef.current);
		}
	}, [getIFrameRef]);

	return (
		<div>
			{roomName && (
				<>
					<h1>Link da Reunião</h1>
					{meetingLink ? (
						<div>
							<Button onClick={copyMeetingLink}>Copiar Link da Reunião</Button>
							<div style={{ marginTop: '20px' }}>
								<span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
									{meetingLink}
								</span>
							</div>
						</div>
					) : (
						<p>Carregando...</p>
					)}
				</>
			)}
			<div ref={jitsiContainerRef} />
		</div>
	);
};

export default JitsiMeeting;
