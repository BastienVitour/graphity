import { useEffect } from "react";
import useSessionStore from "@/src/zustand/sessionStore";
import { Redirect } from "expo-router";

export default function Logout() {
	const signOut = useSessionStore((state) => state.signOut);

	useEffect(() => {
		signOut();
	});

	return <Redirect href="/login" />;
}
