import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import mediaItemStyles from "../styles/MediaItemStyle";

interface MediaItemProps {
	item: {
		title: string;
		gifUrl: string;
		username: string;
	};
}

const MediaItem = ({ item }: MediaItemProps) => {
	return (
		<View style={mediaItemStyles.mediaContainer}>
			<Text style={mediaItemStyles.mediaTitle}>
				{item.title || "Sans titre"}
			</Text>
			<Image
				source={{ uri: item.gifUrl }}
				style={mediaItemStyles.mediaImage}
				autoplay
			/>
			<Text style={mediaItemStyles.mediaFooter}>
				Par {item.username ? `@${item.username}` : "Anonyme"}
			</Text>
		</View>
	);
};

export default MediaItem;
