import React, { useState, useEffect } from "react";
import {
	View,
	FlatList,
	TouchableOpacity,
	Modal,
	Text,
	TextInput,
	PanResponder,
	Animated
} from "react-native";
import { Image } from "expo-image";
import { Video } from "expo-av";
import { GetItemAsync, SetItemAsync } from "../utils/AsyncStorageService";
import TextOverlay from "./TextOverlay";
import styles from "../styles/ListMediaPersoStyles";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const MEDIA_STORAGE_KEY = "user_media_collection";

type MediaItem = {
	uri: string;
	type: "image" | "video";
	timestamp: number;
	id: string;
	text?: string;
	textPosition?: { x: number; y: number };
};

export default function ListMediaPerso({
	image,
	video
}: {
	image: string | null;
	video: string | null;
}) {
	const [mediaCollection, setMediaCollection] = useState<MediaItem[]>([]);
	const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [text, setText] = useState("");
	const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
	const pan = new Animated.ValueXY();

	useEffect(() => {
		const loadSavedMedia = async () => {
			const savedMedia = await GetItemAsync(MEDIA_STORAGE_KEY);
			if (savedMedia) {
				setMediaCollection(savedMedia);
			}
		};
		loadSavedMedia();
	}, []);

	useEffect(() => {
		if (image) {
			const newMedia: MediaItem = {
				uri: image,
				type: "image",
				timestamp: Date.now(),
				id: `img_${Date.now()}`
			};
			addMediaToCollection(newMedia);
		}
	}, [image]);

	useEffect(() => {
		if (video) {
			const newMedia: MediaItem = {
				uri: video,
				type: "video",
				timestamp: Date.now(),
				id: `vid_${Date.now()}`
			};
			addMediaToCollection(newMedia);
		}
	}, [video]);

	const addMediaToCollection = async (newMedia: MediaItem) => {
		const updatedCollection = [newMedia, ...mediaCollection];
		setMediaCollection(updatedCollection);
		await SetItemAsync(MEDIA_STORAGE_KEY, updatedCollection);
	};

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
			useNativeDriver: false
		}),
		onPanResponderRelease: (e, gestureState) => {
			setTextPosition({
				x: textPosition.x + gestureState.dx,
				y: textPosition.y + gestureState.dy
			});

			pan.setValue({ x: 0, y: 0 });
		}
	});

	const uploadToGiphy = async () => {
		//check the api key
		if (selectedMedia && process.env.EXPO_PUBLIC_API_KEY) {
			let file;
			// read the file
			await FileSystem.readAsStringAsync(selectedMedia.uri).then(
				(result: any) => {
					file = result;
				}
			);
			if (file) {
				let formData = new FormData();
				// formData.append("api_key", process.env.EXPO_PUBLIC_API_KEY);
				formData.append("file", new Blob([file]));
				await axios
					.post(
						`${process.env.EXPO_PUBLIC_GIPHY_UPLOAD_URL}`,
						formData,
						{
							headers: { "Content-Type": "multipart/form-data" }
						}
					)
					.then(async (response: any) => {
						await response.json();
						console.log(response);
					})
					.catch((error) => {
						console.error("Error uploading file:", error);
					});
			}
		}
	};

	const saveTextToMedia = async () => {
		if (!selectedMedia) return;

		const updatedMedia = {
			...selectedMedia,
			text,
			textPosition
		};

		const updatedCollection = mediaCollection.map((item) =>
			item.id === selectedMedia.id ? updatedMedia : item
		);

		setMediaCollection(updatedCollection);
		await SetItemAsync(MEDIA_STORAGE_KEY, updatedCollection);
		setModalVisible(false);
	};

	const handleMediaPress = (item: MediaItem) => {
		setSelectedMedia(item);
		if (item.text) {
			setText(item.text);
		} else {
			setText("");
		}
		if (item.textPosition) {
			setTextPosition(item.textPosition);
		} else {
			setTextPosition({ x: 50, y: 50 });
		}
		setModalVisible(true);
	};

	const renderMediaItem = ({ item }: { item: MediaItem }) => {
		return (
			<TouchableOpacity
				style={styles.mediaItem}
				onPress={() => handleMediaPress(item)}>
				{item.type === "video" ? (
					<View>
						<Video
							source={{ uri: item.uri }}
							style={styles.thumbnail}
							useNativeControls={false}
							resizeMode="cover"
						/>
						<View style={styles.playIcon}>
							<Text style={styles.playIconText}>▶</Text>
						</View>
					</View>
				) : (
					<Image
						source={{ uri: item.uri }}
						style={styles.thumbnail}
						resizeMode="cover"
					/>
				)}
				{item.text && (
					<View style={styles.textIndicator}>
						<Text style={styles.textIndicatorLabel}>Aa</Text>
					</View>
				)}
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={mediaCollection}
				renderItem={renderMediaItem}
				keyExtractor={(item) => item.id}
				numColumns={4}
				contentContainerStyle={styles.list}
			/>

			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.modalHeader}>
						<TouchableOpacity
							onPress={() => setModalVisible(false)}>
							<Text style={styles.closeButton}>Annuler</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={saveTextToMedia}>
							<Text style={styles.saveButton}>Enregistrer</Text>
						</TouchableOpacity>
						{/* <TouchableOpacity onPress={uploadToGiphy}>
							<Text style={styles.saveButton}>
								Envoyer sur Giphy
							</Text>
						</TouchableOpacity> */}
					</View>

					<View style={styles.mediaViewContainer}>
						{selectedMedia?.type === "video" ? (
							<Video
								source={{ uri: selectedMedia.uri }}
								style={styles.fullMedia}
								useNativeControls
								resizeMode="contain"
								shouldPlay
							/>
						) : (
							<Image
								source={{ uri: selectedMedia?.uri }}
								style={styles.fullMedia}
								resizeMode="contain"
								autoplay
							/>
						)}

						<TextOverlay
							text={text}
							pan={pan}
							textPosition={textPosition}
							panHandlers={panResponder.panHandlers}
						/>
					</View>

					<View style={styles.textInputContainer}>
						<TextInput
							style={styles.textInput}
							onChangeText={setText}
							value={text}
							placeholder="Ajouter du texte ici"
							placeholderTextColor="#999"
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}
