// ImagePickerExample.tsx
import React from "react";
import { Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/ImagePickerStyles"; // Import the styles

export default function ImagePickerExample({
	onMediaCaptured
}: {
	onMediaCaptured: (uri: string, type: "image" | "video") => void;
}) {
	const pickMedia = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});

		if (!result.canceled && result.assets.length > 0) {
			const uri = result.assets[0].uri;
			const type =
				uri.endsWith(".mp4") || uri.includes("video")
					? "video"
					: "image";
			onMediaCaptured(uri, type);
		}
	};

	return (
		<View style={styles.container}>
			<Button title="Gallerie" onPress={pickMedia} />
		</View>
	);
}
