import { FlatList, RefreshControl, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import EmptyState from "@/src/components/EmptyState";
import useSessionStore from "@/src/zustand/sessionStore";
import fetchMedias from "@/src/services/FavoritesService";
import MediaItem from "@/src/components/MediaItem";

export default function FavoritesScreen() {
	const [media, setMedia] = useState<any[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const currentUser = useSessionStore((state) => state.user);

	const fetchFavorites = async () => {
		try {
			const result = await fetchMedias(currentUser.id);
			if (result.length > 0) {
				setMedia(result);
			}
		} catch (error) {
		} finally {
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchFavorites();
	}, []);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchFavorites();
	};

	return (
		<SafeAreaView>
			<Text>Mes favoris</Text>
			{media && (
				<FlatList
					data={media}
					renderItem={({ item }) => <MediaItem item={item} />}
					keyExtractor={(item, index) => `${item.id}-${index}`}
					onEndReachedThreshold={0.3}
					ListEmptyComponent={<EmptyState mediaType={"gifs"} />}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={handleRefresh}
						/>
					}
				/>
			)}
		</SafeAreaView>
	);
}
