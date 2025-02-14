import React from 'react';
import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewer from './components/ImageComponent';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const placeHolder = require('./assets/images/background-image.png');
export default function Home() {
	const [selected, setSelected] = useState(null);
	const [showAppOptions, setShowAppOptions] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [pickedEmoji, setPickedEmoji] = useState(null);
	const [status, requestPermission] = MediaLibrary.usePermissions();
	const imageRef = useRef();
	const onReset = () => {
		setShowAppOptions(false);
	};

	const onAddSticker = () => {
		setModalVisible(true);
	};

	const onModalClose = () => {
		setModalVisible(false);
	};
	const onSaveImageAsync = async () => {
		try {
			const localUri = await captureRef(imageRef, {
				height: 440,
				quality: 1,
			});

			await MediaLibrary.saveToLibraryAsync(localUri);
			if (localUri) {
				alert('Saved!');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelected(result.assets[0].uri);
			setShowAppOptions(true);
			console.log(result);
		} else {
			alert('You did not select any image.');
		}
	};
	if (status === null) {
		requestPermission();
	}
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer
						placeholderImageSource={placeHolder}
						selected={selected}
					/>
					{pickedEmoji && (
						<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
					)}
				</View>
			</View>
			{showAppOptions ? (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton icon='refresh' label='Reset' onPress={onReset} />
						<CircleButton onPress={onAddSticker} />
						<IconButton
							icon='save-alt'
							label='Save'
							onPress={onSaveImageAsync}
						/>
					</View>
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button
						label='Choose a photo'
						theme={'primary'}
						onPress={pickImageAsync}
					/>
					<Button
						label='Use this photo'
						theme={'non-primary'}
						onPress={() => setShowAppOptions(true)}
					/>
				</View>
			)}

			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
			</EmojiPicker>
			<StatusBar style='auto' />
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
	},
	imageContainer: {
		flex: 1,
		paddingTop: 58,
	},
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 80,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
});
