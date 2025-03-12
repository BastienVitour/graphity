import { useState, useEffect } from "react";
import { Button, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import React = require("react");

export default function Camera({
	onVideoCaptured
}: {
	onVideoCaptured: (uri: string | null) => void;
}) {
	const [video, setVideo] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const cameraPermission =
				await ImagePicker.requestCameraPermissionsAsync();
			if (cameraPermission.status !== "granted") {
				Alert.alert(
					"Permission nécessaire",
					"L'accès à la caméra est nécessaire pour capturer des vidéos."
				);
			}
		})();
	}, []);

	const pickVideo = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: "videos",
			allowsEditing: true,
			quality: 1
		});

		console.log(result);

		// if (!result.canceled && result.assets && result.assets.length > 0) {
		// 	setVideo(result.assets[0].uri);
		// }
		if (!result.canceled && result.assets.length > 0) {
			onVideoCaptured(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.container}>
			<Button title="Caméra" onPress={pickVideo} />
			{/* {video && (
				<Video
					source={{ uri: video }}
					style={styles.video}
					useNativeControls
					//resizeMode="contain"
					shouldPlay
					isLooping
				/>
			)} */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-end",
		alignItems: "center"
	}
});
