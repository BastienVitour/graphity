import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import mediaItemStyles from "../styles/MediaItemStyle";

interface MediaItemProps {
	item: {
		title: string;
		gifUrl: string;
		username: string;
	};
}

const MediaItem = ({ item }: MediaItemProps) => {
	return (
		<View style={mediaItemStyles.mediaContainer}>
			<Text style={mediaItemStyles.mediaTitle}>
				{item.title || "Sans titre"}
			</Text>
			<WebView
				source={{
					html: `
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    background-color: transparent;
                  }
                  img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                  }
                </style>
              </head>
              <body>
                <img src="${item.gifUrl}" />
              </body>
            </html>
          `
				}}
				style={mediaItemStyles.mediaImage}
				scrollEnabled={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				bounces={false}
			/>
			<Text style={mediaItemStyles.mediaFooter}>
				Par {item.username ? `@${item.username}` : "Anonyme"}
			</Text>
		</View>
	);
};

export default MediaItem;
