import { WebView } from "react-native-webview";

export default function ReadmeScreen() {
	return (
		<WebView
			source={{
				uri: "https://github.com/BastienVitour/graphity/blob/main/README.md"
			}}
		/>
	);
}
