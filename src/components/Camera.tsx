import React, { useState, useEffect } from "react";
import { Button, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import styles from "../styles/CameraStyles"; // Import the styles

export default function Camera({
	onMediaCaptured
}: {
	onMediaCaptured: (uri: string, type: "image" | "video") => void;
}) {
	useEffect(() => {
		(async () => {
			const cameraPermission =
				await ImagePicker.requestCameraPermissionsAsync();
			if (cameraPermission.status !== "granted") {
				Alert.alert(
					"Permission nécessaire",
					"L'accès à la caméra est nécessaire pour capturer des photos et vidéos."
				);
			}
		})();
	}, []);

	const takePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});

		if (!result.canceled && result.assets.length > 0) {
			onMediaCaptured(result.assets[0].uri, "image");
		}
	};

	const takeVideo = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
			quality: 1
		});

		if (!result.canceled && result.assets.length > 0) {
			onMediaCaptured(result.assets[0].uri, "video");
		}
	};

	return (
		<View style={styles.container}>
			<Button title="Photo" onPress={takePhoto} />
			<Button title="Vidéo" onPress={takeVideo} />
		</View>
	);
}
