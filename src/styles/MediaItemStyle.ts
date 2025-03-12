import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const mediaItemStyles = StyleSheet.create({
	mediaContainer: {
		margin: 10,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3
	},
	mediaTitle: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 8
	},
	mediaImage: {
		width: width - 40,
		height: width - 40,
		borderRadius: 5
	},
	mediaFooter: {
		marginTop: 8,
		fontSize: 14,
		color: "#555"
	}
});

export default mediaItemStyles;
