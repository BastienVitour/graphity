import { Text, View, Image } from "react-native";

export default function MediaInfo() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center"
			}}>
			<Text>Edit app/index.tsx to edit this screen.</Text>
			<Image
				style={{ width: 250, height: 250 }}
				source={{
					uri: "https://api.giphy.com/v1/gifs/wIePCLOwUQ4RW?api_key=MbGNtN3cb1QbXz4KgOWqAZcWmC8pQPJ7"
				}}
			/>
		</View>
	);
}
