import React from "react";
import { View, Text } from "react-native";
import emptyStateStyles from "../styles/EmptyStateStyle";

interface EmptyStateProps {
	mediaType: "gifs" | "stickers" | "all";
}

const EmptyState = ({ mediaType }: EmptyStateProps) => {
	const getEmptyText = () => {
		if (mediaType === "gifs") return "Aucun GIF trouvé";
		if (mediaType === "stickers") return "Aucun sticker trouvé";
		return "Aucun média trouvé";
	};

	return (
		<View style={emptyStateStyles.emptyContainer}>
			<Text style={emptyStateStyles.emptyText}>{getEmptyText()}</Text>
		</View>
	);
};

export default EmptyState;
