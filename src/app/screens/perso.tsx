import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import ImagePickerExample from "../components/ImagePicker";
import Camera from "../components/Camera";
import ListMediaPerso from "../components/ListMediaPerso";

export default function Perso() {
	const [image, setImage] = useState<string | null>(null);
	const [video, setVideo] = useState<string | null>(null);
	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<ImagePickerExample onImageCaptured={setImage} />
				<Camera onVideoCaptured={setVideo} />
			</View>

			<View style={styles.media}>
				<ListMediaPerso image={image} video={video} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column"
	},
	buttons: {
		marginTop: 20,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly"
	},
	media: {
		width: "100%",
		height: 200
	}
});
