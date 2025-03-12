import React from "react";
import { View, TextInput, Text } from "react-native";
import searchBarStyles from "../styles/SearchBarStyle";

interface SearchBarProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	isSearching: boolean;
}

const SearchBar = ({
	searchQuery,
	setSearchQuery,
	isSearching
}: SearchBarProps) => {
	return (
		<View>
			<TextInput
				style={searchBarStyles.searchInput}
				placeholder="Rechercher GIFs ou Stickers..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>
			{isSearching && (
				<Text style={searchBarStyles.searchingText}>
					Recherche en cours...
				</Text>
			)}
		</View>
	);
};

export default SearchBar;
