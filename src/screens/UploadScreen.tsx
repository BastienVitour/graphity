import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import ImagePickerExample from "../components/ImagePicker";
import Camera from "../components/Camera";
import ListMediaPerso from "../components/ListMediaPerso";
import styles from "../styles/PersoStyle";

export default function UploadScreen() {
	const [image, setImage] = useState<string | null>(null);
	const [video, setVideo] = useState<string | null>(null);

	const handleMediaCaptured = (uri: string, type: "image" | "video") => {
		if (type === "image") {
			setImage(uri);
		} else {
			setVideo(uri);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<ImagePickerExample onMediaCaptured={handleMediaCaptured} />
				<Camera onMediaCaptured={handleMediaCaptured} />
			</View>

			<View style={styles.mediaContainer}>
				<ListMediaPerso image={image} video={video} />
			</View>
		</View>
	);
}
