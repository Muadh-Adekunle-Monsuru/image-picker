import React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Splash from './components/Splash';
import Home from './Home';
export default function App() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	return isLoading ? <Splash setIsLoading={setIsLoading} /> : <Home />;
}
