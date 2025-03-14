import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import filterButtonsStyles from "../styles/FilterButtonsStyle";

interface FilterButtonsProps {
	mediaType: "gifs" | "stickers" | "all";
	toggleMediaType: (type: "gifs" | "stickers") => void;
}

const FilterButtons = ({ mediaType, toggleMediaType }: FilterButtonsProps) => {
	const isTypeActive = (type: "gifs" | "stickers") => {
		return mediaType === type;
	};

	return (
		<>
			<View style={filterButtonsStyles.filterContainer}>
				<TouchableOpacity
					style={[
						filterButtonsStyles.filterButton,
						isTypeActive("gifs") &&
							filterButtonsStyles.activeFilterButton
					]}
					onPress={() => toggleMediaType("gifs")}>
					<Text
						style={[
							filterButtonsStyles.filterButtonText,
							isTypeActive("gifs") &&
								filterButtonsStyles.activeFilterButtonText
						]}>
						GIFs
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						filterButtonsStyles.filterButton,
						isTypeActive("stickers") &&
							filterButtonsStyles.activeFilterButton
					]}
					onPress={() => toggleMediaType("stickers")}>
					<Text
						style={[
							filterButtonsStyles.filterButtonText,
							isTypeActive("stickers") &&
								filterButtonsStyles.activeFilterButtonText
						]}>
						Stickers
					</Text>
				</TouchableOpacity>
			</View>

			<View style={filterButtonsStyles.currentFilterContainer}>
				<Text style={filterButtonsStyles.currentFilterText}>
					{mediaType === "all"
						? "Affichage : Tous les médias"
						: `Affichage : ${mediaType === "gifs" ? "GIFs" : "Stickers"}`}
				</Text>
			</View>
		</>
	);
};

export default FilterButtons;
