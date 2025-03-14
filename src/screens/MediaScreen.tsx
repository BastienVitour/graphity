import {
	Text,
	View,
	Linking,
	StyleSheet,
	Button,
	Modal,
	Pressable,
	Alert
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/MediaScreenStyle";

interface Media {
	type: string;
	id: string;
	url: string;
	slug: string;
	bitly_gif_url: string;
	bitly_url: string;
	embed_url: string;
	username: string;
	source: string;
	title: string;
	rating: string;
	content_url: string;
	source_tld: string;
	source_post_url: string;
	is_sticker: boolean;
	import_datetime: string;
	trending_datetime: string;
	original_image: any;
	alt_text: string;
}

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function MediaScreen() {
	const { id } = useLocalSearchParams<{
		id: string;
	}>();

	const [modalVisible, setModalVisible] = useState(false);
	const [media, setMedia] = useState<Media | null>(null);

	useEffect(() => {
		// IIFE
		(async () => {
			let response: any;
			await fetch(
				`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`
			).then(async (response: any) => {
				await response.json().then((data: any) => {
					response = data;
				});

				const mediaData: Media = {
					type: response.data.type,
					id: response.data.id,
					url: response.data.url,
					slug: response.data.slug,
					bitly_gif_url: response.data.bitly_gif_url,
					bitly_url: response.data.bitly_url,
					embed_url: response.data.embed_url,
					username: response.data.username,
					source: response.data.source,
					title: response.data.title,
					rating: response.data.rating,
					content_url: response.data.content_url,
					source_tld: response.data.source_tld,
					source_post_url: response.data.source_post_url,
					is_sticker: Boolean(parseInt(response.data.is_sticker)),
					import_datetime: response.data.import_datetime,
					trending_datetime: response.data.trending_datetime,
					original_image: response.data.images.original,
					alt_text: response.data.alt_text
				};

				setMedia(mediaData);
			});
		})();
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView
				style={{
					flex: 1
				}}>
				{media ? (
					<View style={styles.page}>
						<View style={styles.top_container}>
							<Text style={styles.title}>{media.title}</Text>
							<View>
								<Image
									autoplay
									style={{ width: 250, height: 250 }}
									source={{
										uri: media.original_image.url
									}}
								/>
								<Text>Type : {media.type}</Text>
							</View>
							<Text style={styles.alt_text}>
								{media.alt_text}
							</Text>
						</View>
						<View style={styles.bottom_container}>
							<Text style={styles.alt_desc}>
								Post Originel :{" "}
								<Text
									style={styles.url}
									onPress={() => {
										Linking.openURL(media.source_post_url);
									}}>
									{media.source_post_url}
								</Text>
							</Text>
							{media.import_datetime !== "" && (
								<Text style={styles.alt_desc}>
									Date de publication :{" "}
									{media.import_datetime}
								</Text>
							)}
							<View style={styles.alt_button}>
								<Button
									title="Plus de détails"
									color="#841584"
									accessibilityLabel="See more informations about this media"
									onPress={() => {
										setModalVisible(true);
									}}
								/>
							</View>
						</View>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								Alert.alert("Modal has been closed.");
								setModalVisible(!modalVisible);
							}}>
							<View style={styles.centeredView}>
								<View style={[styles.modalView]}>
									<Text style={styles.desc_text}>
										Titre : {media.title}
									</Text>
									<Text style={styles.desc_text}>
										Type : {media.type}
									</Text>
									<Text style={styles.desc_text}>
										ID : {media.id}
									</Text>
									<Text style={styles.desc_text}>
										URL :{" "}
										<Text
											style={[
												styles.url,
												styles.desc_text
											]}
											onPress={() => {
												Linking.openURL(media.url);
											}}>
											{media.url}
										</Text>
									</Text>
									<Text style={styles.desc_text}>
										Slug : {media.slug}
									</Text>
									<Text style={styles.desc_text}>
										Bitly GIF URL :{" "}
										<Text
											style={[
												styles.url,
												styles.desc_text
											]}
											onPress={() => {
												Linking.openURL(
													media.bitly_gif_url
												);
											}}>
											{media.bitly_gif_url}
										</Text>
									</Text>
									<Text style={styles.desc_text}>
										Bitly URL :{" "}
										<Text
											style={styles.url}
											onPress={() => {
												Linking.openURL(
													media.bitly_url
												);
											}}>
											{media.bitly_url}
										</Text>
									</Text>
									<Text style={styles.desc_text}>
										Embed URL :{" "}
										<Text
											style={[
												styles.url,
												styles.desc_text
											]}
											onPress={() => {
												Linking.openURL(
													media.embed_url
												);
											}}>
											{media.embed_url}
										</Text>
									</Text>
									<Text style={styles.desc_text}>
										Utilisateur : {media.username}
									</Text>
									<Text style={styles.desc_text}>
										Source :{" "}
										<Text
											style={[
												styles.url,
												styles.desc_text
											]}
											onPress={() => {
												Linking.openURL(media.source);
											}}>
											{media.source}
										</Text>
									</Text>
									<Text style={styles.desc_text}>
										Rating : {media.rating}
									</Text>
									<Text style={styles.desc_text}>
										Content URL :{" "}
										<Text
											style={styles.url}
											onPress={() => {
												Linking.openURL(
													media.bitly_url
												);
											}}>
											{media.bitly_url}
										</Text>
									</Text>
									<Text style={styles.desc_text}>
										Source tld : {media.source_tld}
									</Text>
									<Text>
										{" "}
										URL Source :{" "}
										<Text
											style={[
												styles.url,
												styles.desc_text
											]}
											onPress={() => {
												Linking.openURL(
													media.source_post_url
												);
											}}>
											{media.source_post_url}
										</Text>
									</Text>
									<Text style={styles.desc_text}>
										Sticker : {media.is_sticker}
									</Text>
									<Text style={styles.desc_text}>
										Date d'import : {media.import_datetime}
									</Text>
									<Text style={styles.desc_text}>
										Date de trending :{" "}
										{media.trending_datetime}
									</Text>

									<View
										style={{
											marginTop: 30,
											alignItems: "center"
										}}>
										<Button
											color="#6e6e6e"
											onPress={() =>
												setModalVisible(!modalVisible)
											}
											title="Close"></Button>
									</View>
								</View>
							</View>
						</Modal>
					</View>
				) : (
					<Text>Cannot fetch media.</Text>
				)}
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
