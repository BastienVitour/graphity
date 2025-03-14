import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 15,
		textAlign: "center",
		justifyContent: "center",
		gap: 10
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 25
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		width: "100%",
		borderColor: "gray",
		height: 40
	},
	link: {
		color: "#1b41b3",
		textDecorationLine: "underline"
	}
});

export default styles;
