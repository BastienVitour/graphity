import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const itemWidth = width / 4 - 8;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10
	},
	list: {
		paddingVertical: 5
	},
	mediaItem: {
		margin: 2,
		position: "relative"
	},
	thumbnail: {
		width: itemWidth,
		height: itemWidth,
		borderRadius: 4
	},
	playIcon: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.2)"
	},
	playIconText: {
		color: "white",
		fontSize: 24
	},
	textIndicator: {
		position: "absolute",
		bottom: 5,
		right: 5,
		backgroundColor: "rgba(0,0,0,0.6)",
		borderRadius: 10,
		padding: 2,
		width: 20,
		height: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	textIndicatorLabel: {
		color: "white",
		fontSize: 10
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "black"
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 15,
		backgroundColor: "#222"
	},
	closeButton: {
		color: "white",
		fontSize: 16
	},
	saveButton: {
		color: "#3498db",
		fontSize: 16,
		fontWeight: "bold"
	},
	mediaViewContainer: {
		flex: 1,
		position: "relative"
	},
	fullMedia: {
		width: "100%",
		height: "100%"
	},
	textInputContainer: {
		padding: 15,
		backgroundColor: "#222"
	},
	textInput: {
		backgroundColor: "#333",
		color: "white",
		padding: 10,
		borderRadius: 5,
		fontSize: 16
	}
});

export default styles;
