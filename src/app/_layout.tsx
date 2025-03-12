import { Stack } from "expo-router";
import React = require("react");

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
