import { StyleSheet } from "react-native";

const filterButtonsStyles = StyleSheet.create({
	filterContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 10,
		paddingHorizontal: 20
	},
	filterButton: {
		paddingVertical: 8,
		paddingHorizontal: 20,
		marginHorizontal: 5,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		backgroundColor: "#f8f8f8"
	},
	activeFilterButton: {
		backgroundColor: "#007bff",
		borderColor: "#007bff"
	},
	filterButtonText: {
		fontSize: 14,
		color: "#333"
	},
	activeFilterButtonText: {
		color: "#fff"
	},
	currentFilterContainer: {
		alignItems: "center",
		marginBottom: 10
	},
	currentFilterText: {
		fontSize: 12,
		color: "#666",
		fontStyle: "italic"
	}
});

export default filterButtonsStyles;
