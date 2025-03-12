import { Button, Text, View } from "react-native";
import useSessionStore from "@/src/zustand/sessionStore";

export default function Index() {
	//const { signOut } = useSession();
	const signOut = useSessionStore((state) => state.signOut);
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text
				onPress={() => {
					// The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
					signOut();
				}}>
				Sign Out
			</Text>
		</View>
	);
}
