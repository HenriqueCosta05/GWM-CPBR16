import React, { useState } from 'react';
import JitsiMeeting from '../../compnents/JitsyMeeting';

function Meet() {
	const [roomName, setRoomName] = useState('my-meeting-room');

	const handleApiReady = (api: any) => {
		console.log('API is ready:', api);
		// Adicionar listeners ou armazenar a API conforme necessário
	};

	const handleIFrameRef = (iframeRef: HTMLIFrameElement) => {
		iframeRef.style.height = '400px';
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Jitsi Meeting</h1>
				<input
					type="text"
					value={roomName}
					onChange={(e) => setRoomName(e.target.value)}
					placeholder="Enter room name"
				/>
				<JitsiMeeting
					roomName={roomName}
					configOverwrite={{
						startWithAudioMuted: true,
						disableModeratorIndicator: true,
						startScreenSharing: true,
						enableEmailInStats: false,
					}}
					interfaceConfigOverwrite={{
						DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
					}}
					userInfo={{
						displayName: 'YOUR_USERNAME',
					}}
					onApiReady={handleApiReady}
					getIFrameRef={handleIFrameRef}
				/>
			</header>
		</div>
	);
}

export default Meet;
