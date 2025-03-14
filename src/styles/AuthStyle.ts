import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		textAlign: "center",
		justifyContent: "center",
		gap: 10,
		width: "100%",
		backgroundColor: "#4b0f93",
		color: "#fff"
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 25,
		color: "#fff"
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		width: "100%",
		borderColor: "white",
		height: 40,
		color: "#fff"
	},
	login: {
		backgroundColor: "#000000",
		borderRadius: 5,
		padding: 10,
		color: "#fff",
		textAlign: "center",
		fontSize: 16
	},
	Textlink: {
		color: "#fff"
	},
	link: {
		textDecorationLine: "underline",
		color: "#fff"
	}
});

export default styles;
