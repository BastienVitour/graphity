import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#4b0f93"
	},
	buttons: {
		marginTop: 20,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		paddingHorizontal: 10
	},
	mediaContainer: {
		flex: 1,
		width: "100%",
		marginTop: 10
	}
});

export default styles;
