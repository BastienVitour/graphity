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

export default function MediaScreen() {
	const { id, apiKey } = useLocalSearchParams<{
		id: string;
		apiKey: string;
	}>();

	const [modalVisible, setModalVisible] = useState(false);
	const [media, setMedia] = useState<Media | null>(null);

	useEffect(() => {
		// IIFE
		(async () => {
			let response: any;
			await fetch(
				`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`
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
					<View
						style={{
							flex: 1,
							justifyContent: "space-around",
							alignItems: "center",
							marginLeft: 15,
							marginRight: 15,
							marginTop: 30,
							marginBottom: 30
						}}>
						<Text>{media.title}</Text>
						<Image
							autoplay
							style={{ width: 250, height: 250 }}
							source={{
								uri: media.original_image.url
							}}
						/>
						<Text>{media.alt_text}</Text>
						<Text>
							Original post :{" "}
							<Text
								style={styles.url}
								onPress={() => {
									Linking.openURL(media.source_post_url);
								}}>
								{media.source_post_url}
							</Text>
						</Text>
						<Text>Uploaded on : {media.import_datetime}</Text>
						<Text>Type : {media.type}</Text>
						<Text>Rating : {media.rating}</Text>
						<Button
							title="More details"
							color="#841584"
							accessibilityLabel="See more informations about this media"
							onPress={() => {
								setModalVisible(true);
							}}
						/>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								Alert.alert("Modal has been closed.");
								setModalVisible(!modalVisible);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text>Title : {media.title}</Text>
									<Text>Type : {media.type}</Text>
									<Text>ID : {media.id}</Text>
									<Text>
										URL :{" "}
										<Text
											style={styles.url}
											onPress={() => {
												Linking.openURL(media.url);
											}}>
											{media.url}
										</Text>
									</Text>
									<Text>Slug : {media.slug}</Text>
									<Text>
										Bitly GIF URL :{" "}
										<Text
											style={styles.url}
											onPress={() => {
												Linking.openURL(
													media.bitly_gif_url
												);
											}}>
											{media.bitly_gif_url}
										</Text>
									</Text>
									<Text>
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
									<Text>
										Embed URL :{" "}
										<Text
											style={styles.url}
											onPress={() => {
												Linking.openURL(
													media.embed_url
												);
											}}>
											{media.embed_url}
										</Text>
									</Text>
									<Text>Username : {media.username}</Text>
									<Text>
										Source :{" "}
										<Text
											style={styles.url}
											onPress={() => {
												Linking.openURL(media.source);
											}}>
											{media.source}
										</Text>
									</Text>
									<Text>Rating : {media.rating}</Text>
									<Text>
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
									<Text>Source tld : {media.source_tld}</Text>
									<Text>
										{" "}
										Source post URL :{" "}
										<Text
											style={styles.url}
											onPress={() => {
												Linking.openURL(
													media.source_post_url
												);
											}}>
											{media.source_post_url}
										</Text>
									</Text>
									<Text>
										Is a sticker : {media.is_sticker}
									</Text>
									<Text>
										Import date & time :{" "}
										{media.import_datetime}
									</Text>
									<Text>
										Trending date & time :{" "}
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

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 15,
		marginTop: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "#6e6e6e"
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	url: { color: "blue" }
});
