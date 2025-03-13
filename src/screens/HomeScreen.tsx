import React, { useState, useEffect } from "react";
import {
	View,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	Text,
	TouchableOpacity
} from "react-native";
import axios from "axios";
import { useDebounce } from "use-debounce";
import homeStyles from "../styles/HomeStyle";
import MediaItem from "../components/MediaItem";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import EmptyState from "../components/EmptyState";
import useSessionStore from "@/src/zustand/sessionStore";
import { GetItemAsync } from "@/src/utils/AsyncStorageService";
import { useIsFocused } from "@react-navigation/native";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const TRENDING_GIFS = "https://api.giphy.com/v1/gifs/trending";
const TRENDING_STICKERS = "https://api.giphy.com/v1/stickers/trending";
const SEARCH_GIFS = "https://api.giphy.com/v1/gifs/search";
const SEARCH_STICKERS = "https://api.giphy.com/v1/stickers/search";

const pageSize = 10;

const HomeScreen = () => {
	const [media, setMedia] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [debouncedSearchQuery] = useDebounce(searchQuery, 1500);
	const [mediaType, setMediaType] = useState<"gifs" | "stickers" | "all">(
		"all"
	);
	const [offset, setOffset] = useState<number>(0);
	const [favorites, setFavorites] = useState<string[]>([]);
	const currentUser = useSessionStore((state) => state.user);
	const isFocused = useIsFocused();

	const fetchMedia = async (
		query: string = "",
		shouldRefresh: boolean = false
	) => {
		if (loading) return;

		setLoading(true);

		const currentOffset = shouldRefresh ? 0 : offset;

		try {
			if (mediaType === "all") {
				const endpoints = query
					? [SEARCH_GIFS, SEARCH_STICKERS]
					: [TRENDING_GIFS, TRENDING_STICKERS];

				const requests = endpoints.map((endpoint) =>
					axios.get(endpoint, {
						params: {
							api_key: API_KEY,
							limit: pageSize / 2,
							offset: currentOffset,
							q: query
						}
					})
				);

				const responses = await Promise.all(requests);

				const combinedMedia = [];
				for (const response of responses) {
					const formattedMedia = response.data.data.map(
						(item: any) => ({
							...item,
							gifUrl: item.images.original.url,
							isFavorite: favorites.includes(item.id),
							currentUserId: currentUser.id
						})
					);
					combinedMedia.push(...formattedMedia);
				}

				const shuffledMedia = combinedMedia.sort(
					() => Math.random() - 0.5
				);

				if (shouldRefresh) {
					setMedia(shuffledMedia);
					setOffset(pageSize);
				} else {
					setMedia((prevMedia) => [...prevMedia, ...shuffledMedia]);
					setOffset(currentOffset + pageSize);
				}
			} else {
				let endpoint;
				if (mediaType === "gifs") {
					endpoint = query ? SEARCH_GIFS : TRENDING_GIFS;
				} else {
					endpoint = query ? SEARCH_STICKERS : TRENDING_STICKERS;
				}

				const response = await axios.get(endpoint, {
					params: {
						api_key: API_KEY,
						limit: pageSize,
						offset: currentOffset,
						q: query
					}
				});

				const newMedia = response.data.data.map((item: any) => ({
					...item,
					gifUrl: item.images.original.url
				}));

				if (shouldRefresh) {
					setMedia(newMedia);
					setOffset(pageSize);
				} else {
					setMedia((prevMedia) => [...prevMedia, ...newMedia]);
					setOffset(currentOffset + pageSize);
				}
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des médias :", error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	const fetchFavorites = async () => {
		try {
			const results: any[] | null = await GetItemAsync("favorites");
			if (results !== null && results.length > 0) {
				setFavorites(
					results
						.filter((item: any) => item.userId === currentUser.id)
						.map((item: any) => item.mediaId)
				);
			}
		} catch (error) {}
	};

	useEffect(() => {
		if (isFocused) {
			setMedia([]);
			setOffset(0);
			fetchFavorites();
			fetchMedia(debouncedSearchQuery, true);
		}
	}, [debouncedSearchQuery, mediaType, isFocused]);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchFavorites();
		fetchMedia(debouncedSearchQuery, true);
	};

	const loadMoreData = () => {
		if (!loading) {
			fetchFavorites();
			fetchMedia(debouncedSearchQuery);
		}
	};

	const toggleMediaType = (type: "gifs" | "stickers") => {
		if (mediaType === type) {
			setMediaType("all");
		} else {
			setMediaType(type);
		}
	};

	return (
		<View style={homeStyles.container}>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				isSearching={searchQuery !== debouncedSearchQuery}
			/>

			<FilterButtons
				mediaType={mediaType}
				toggleMediaType={toggleMediaType}
			/>

			<FlatList
				data={media}
				renderItem={({ item }) => <MediaItem item={item} />}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				onEndReached={loadMoreData}
				onEndReachedThreshold={0.3}
				ListFooterComponent={
					loading ? (
						<View style={homeStyles.footer}>
							<ActivityIndicator size="large" />
							<Text style={homeStyles.footerText}>
								Chargement...
							</Text>
						</View>
					) : null
				}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
				}
				ListEmptyComponent={
					!loading ? <EmptyState mediaType={mediaType} /> : null
				}
			/>
		</View>
	);
};

export default HomeScreen;
