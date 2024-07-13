import { JitsiMeeting } from '@jitsi/react-sdk';

function MainApp() {
	return (
		<>
			<JitsiMeeting
				domain={'meet.jit.si'}
				roomName="PleaseUseAGoodRoomName"
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
					displayName: 'gabriel',
					email: 'gabriel@mail.com',
				}}
				onApiReady={(externalApi) => {
					// here you can attach custom event listeners to the Jitsi Meet External API
					// you can also store it locally to execute commands
				}}
				getIFrameRef={(iframeRef) => {
					iframeRef.style.height = '400px';
				}}
			/>
		</>
	);
}

export default MainApp;
