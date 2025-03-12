import { Link, router } from "expo-router";
import { Button, SafeAreaView, Text, TextInput } from "react-native";

import useSessionStore from "@/src/zustand/sessionStore";
import styles from "@/src/styles/SignupStyle";
import { useState } from "react";

export default function SignIn() {
	const signIn = useSessionStore((state) => state.signIn);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordError, setPasswordError] = useState<boolean>(false);

	const handleSubmit = () => {
		if (username.length > 5) {
			alert("Username already exists!");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Connexion</Text>
			<TextInput
				style={styles.input}
				placeholder={"Pseudo"}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder={"Mot de passe"}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button title={"Se connecter"} onPress={handleSubmit} />
			<Link href={"/signup"}>S'inscrire</Link>
			<Text
				onPress={() => {
					signIn();
					// Navigate after signing in. You may want to tweak this to ensure sign-in is
					// successful before navigating.
					router.replace("/");
				}}>
				Sign In
			</Text>
		</SafeAreaView>
	);
}
