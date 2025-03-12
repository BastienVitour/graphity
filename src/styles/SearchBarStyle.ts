import { StyleSheet } from "react-native";

const searchBarStyles = StyleSheet.create({
	searchInput: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		margin: 10,
		paddingLeft: 10,
		backgroundColor: "white"
	},
	searchingText: {
		textAlign: "center",
		marginTop: -5,
		marginBottom: 5,
		fontSize: 12,
		color: "#666",
		fontStyle: "italic"
	}
});

export default searchBarStyles;
