import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	textOverlay: {
		position: "absolute",
		padding: 10,
		backgroundColor: "transparent"
	},
	overlayText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3
	}
});

export default styles;
