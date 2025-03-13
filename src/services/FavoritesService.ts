import axios from "axios";
import { GetItemAsync } from "@/src/utils/AsyncStorageService";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const GIPHY_BASE_URL = process.env.EXPO_PUBLIC_GIPHY_BASE_URL;

const fetchMedias = async (userId: string) => {
	const favoriteIds = await fetchFavoritesIds(userId);

	if (favoriteIds.length === 0) {
		return [];
	}

	const response = await axios.get(
		`${GIPHY_BASE_URL}gifs?ids=${favoriteIds.join(",")}`,
		{
			params: {
				api_key: API_KEY
			}
		}
	);

	const medias = response.data.data.map((item: any) => ({
		...item,
		gifUrl: item.images.original.url,
		isFavorite: true,
		currentUserId: userId
	}));

	return medias;
};

export default fetchMedias;

const fetchFavoritesIds = async (userId: string) => {
	try {
		const results: any[] | null = await GetItemAsync("favorites");
		if (results !== null && results.length > 0) {
			return results
				.filter((item: any) => item.userId === userId)
				.map((item: any) => item.mediaId);
		} else {
			return [];
		}
	} catch (error) {
		return [];
	}
};
