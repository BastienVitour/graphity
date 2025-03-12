import React, { useState, useEffect } from "react";
import {
	View,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	Text,
	Alert
} from "react-native";
import axios from "axios";
import { useDebounce } from "use-debounce";
import homeStyles from "../styles/HomeStyle";
import MediaItem from "../components/MediaItem";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import EmptyState from "../components/EmptyState";

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
	const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
	const [mediaType, setMediaType] = useState<"gifs" | "stickers" | "all">(
		"all"
	);
	const [offset, setOffset] = useState<number>(0);
	const [noResults, setNoResults] = useState<boolean>(false);
	const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

	const fetchMedia = async (
		query: string = "",
		shouldRefresh: boolean = false
	) => {
		if (loading) return;

		setLoading(true);

		if (query) {
			setSearchAttempted(true);
		}

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
							gifUrl: item.images.original.url
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
					setNoResults(shuffledMedia.length === 0 && query !== "");
				} else {
					setMedia((prevMedia) => [...prevMedia, ...shuffledMedia]);
					setOffset(currentOffset + pageSize);
					if (currentOffset === 0) {
						setNoResults(
							shuffledMedia.length === 0 && query !== ""
						);
					}
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
					setNoResults(newMedia.length === 0 && query !== "");
				} else {
					setMedia((prevMedia) => [...prevMedia, ...newMedia]);
					setOffset(currentOffset + pageSize);
					if (currentOffset === 0) {
						setNoResults(newMedia.length === 0 && query !== "");
					}
				}
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des médias :", error);
			setNoResults(true);
			Alert.alert(
				"Erreur",
				"Une erreur est survenue lors de la récupération des médias. Veuillez réessayer.",
				[{ text: "OK" }]
			);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		setMedia([]);
		setOffset(0);
		setSearchAttempted(debouncedSearchQuery !== "");
		fetchMedia(debouncedSearchQuery, true);
	}, [debouncedSearchQuery, mediaType]);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchMedia(debouncedSearchQuery, true);
	};

	const loadMoreData = () => {
		if (!loading && !noResults) {
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
					!loading && searchAttempted ? (
						<EmptyState mediaType={mediaType} />
					) : null
				}
			/>
		</View>
	);
};

export default HomeScreen;
