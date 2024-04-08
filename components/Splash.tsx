import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash({ setIsLoading }) {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
			}}
		>
			<LottieView
				source={require('../assets/newanimation.json')}
				autoPlay
				loop={false}
				resizeMode='cover'
				style={{ width: '100%', height: '100%' }}
				onAnimationFinish={() => setIsLoading(false)}
			/>
		</View>
	);
}
