import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const homeStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#4b0f93"
	},
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
	},
	footer: {
		padding: 20,
		alignItems: "center"
	},
	footerText: {
		marginTop: 8
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 10
	},
	searchInput: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		margin: 10,
		paddingLeft: 10,
		backgroundColor: "white"
	},
	filterContainerCenter: {
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
	},
	emptyContainer: {
		padding: 20,
		alignItems: "center"
	},
	emptyText: {
		fontSize: 16,
		color: "#888"
	}
});

export default homeStyles;
