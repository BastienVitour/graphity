import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		marginLeft: 15,
		marginRight: 15,
		marginTop: 30,
		marginBottom: 30
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	top_container: {
		justifyContent: "space-around",
		alignItems: "center",
		flexGrow: 1
	},
	bottom_container: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexGrow: 1
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 25
	},
	alt_text: {
		fontSize: 17
	},

	button: {
		borderRadius: 20,
		padding: 15,
		marginTop: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "#6e6e6e"
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	url: { color: "blue" },
	alt_desc: {
		fontStyle: "italic",
		margin: 5
	},
	alt_button: { margin: 15 },
	desc_text: { fontSize: 20 }
});

export default styles;
