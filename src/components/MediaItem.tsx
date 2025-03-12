import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import mediaItemStyles from "../styles/MediaItemStyle";
import { FontAwesome } from "@expo/vector-icons";
import { GetItemAsync, SetItemAsync } from "@/src/utils/AsyncStorageService";

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
			<WebView
				source={{
					html: `
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    background-color: transparent;
                  }
                  img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                  }
                </style>
              </head>
              <body>
                <img src="${item.gifUrl}" />
              </body>
            </html>
          `
				}}
				style={mediaItemStyles.mediaImage}
				scrollEnabled={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				bounces={false}
			/>
			<Text style={mediaItemStyles.mediaFooter}>
				Par {item.username ? `@${item.username}` : "Anonyme"}
			</Text>
		</View>
	);
};

export default MediaItem;
