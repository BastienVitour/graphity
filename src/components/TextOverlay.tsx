import React from "react";
import { Animated, Text } from "react-native";
import styles from "../styles/TextOverlayStyle";

type TextOverlayProps = {
	text: string;
	pan: Animated.ValueXY;
	textPosition: { x: number; y: number };
	panHandlers: any;
};

const TextOverlay = ({
	text,
	pan,
	textPosition,
	panHandlers
}: TextOverlayProps) => {
	return (
		<Animated.View
			style={[
				styles.textOverlay,
				{
					left: Animated.add(pan.x, textPosition.x),
					top: Animated.add(pan.y, textPosition.y)
				}
			]}
			{...panHandlers}>
			<Text style={styles.overlayText}>{text}</Text>
		</Animated.View>
	);
};

export default TextOverlay;
