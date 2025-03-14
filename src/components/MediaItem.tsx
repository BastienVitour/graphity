import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import mediaItemStyles from "../styles/MediaItemStyle";
import { FontAwesome } from "@expo/vector-icons";
import { GetItemAsync, SetItemAsync } from "@/src/utils/AsyncStorageService";
import { router } from "expo-router";

interface MediaItemProps {
	item: {
		title: string;
		gifUrl: string;
		username: string;
		id: string;
		isFavorite: boolean;
		currentUserId: string;
	};
}

const MediaItem = ({ item }: MediaItemProps) => {
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	useEffect(() => {
		setIsFavorite(item.isFavorite);
	}, []);

	const toggleFavorite = async () => {
		const allFavorites: any[] = await GetItemAsync("favorites");
		if (!item.isFavorite) {
			if (
				allFavorites === null ||
				allFavorites === undefined ||
				allFavorites.length === 0
			) {
				await SetItemAsync("favorites", [
					{
						userId: item.currentUserId,
						mediaId: item.id
					}
				]);
			} else {
				await SetItemAsync("favorites", [
					...allFavorites,
					{
						userId: item.currentUserId,
						mediaId: item.id
					}
				]);
			}
		} else {
			await SetItemAsync(
				"favorites",
				allFavorites.filter(
					(favorite) =>
						!(
							favorite.userId === item.currentUserId &&
							favorite.mediaId === item.id
						)
				)
			);
		}
		setIsFavorite(!isFavorite);
	};

	return (
		<View style={mediaItemStyles.mediaContainer}>
			<View style={mediaItemStyles.mediaHeader}>
				<Text style={mediaItemStyles.mediaTitle}>
					{item.title || "Sans titre"}
				</Text>
				<TouchableOpacity onPress={toggleFavorite}>
					<FontAwesome
						name={isFavorite ? "star" : "star-o"}
						color={"gold"}
						size={20}
					/>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={() => {
					router.navigate(`/media?id=${item.id}`);
				}}>
				<Image
					source={{ uri: item.gifUrl }}
					style={mediaItemStyles.mediaImage}
					autoplay
				/>
			</TouchableOpacity>
			<Text style={mediaItemStyles.mediaFooter}>
				Par {item.username ? `@${item.username}` : "Anonyme"}
			</Text>
		</View>
	);
};

export default MediaItem;
