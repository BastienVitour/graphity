import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

export default function ListMediaPerso({
	image,
	video
}: {
	image: string | null;
	video: string | null;
}) {
	const navigation = useNavigation();

	const [lastMedia, setLastMedia] = useState<{
		uri: string;
		type: "image" | "video";
		timestamp: number;
	} | null>(null);

	// Vérifie quel média est le plus récent
	useEffect(() => {
		if (video) {
			setLastMedia({ uri: video, type: "video", timestamp: Date.now() });
		}
	}, [video]);

	useEffect(() => {
		if (image) {
			setLastMedia({ uri: image, type: "image", timestamp: Date.now() });
		}
	}, [image]);

	// Fonction pour envoyer le média au prochain écran
	const handleShare = () => {
		if (lastMedia) {
			navigation.navigate("HomeScreen", { media: lastMedia });
		}
	};

	return (
		<View style={styles.container}>
			{lastMedia?.type === "video" ? (
				<Video
					source={{ uri: lastMedia.uri }}
					style={styles.media}
					useNativeControls
					shouldPlay
					isLooping
				/>
			) : lastMedia?.type === "image" ? (
				<Image source={{ uri: lastMedia.uri }} style={styles.media} />
			) : null}

			{lastMedia && (
				<TouchableOpacity
					style={styles.postButton}
					onPress={handleShare}>
					<Text style={styles.postText}>Publiez</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 300,
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	media: {
		width: 325,
		height: 550
	},
	postButton: {
		position: "absolute",
		bottom: -250,
		width: "80%", // Largeur du bouton
		backgroundColor: "#333",
		paddingVertical: 15,
		alignItems: "center",
		borderRadius: 12
	},
	postText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold"
	}
});
