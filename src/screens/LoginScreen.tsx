import { Link, router } from "expo-router";
import { Button, SafeAreaView, Text, TextInput } from "react-native";

import useSessionStore from "@/src/zustand/sessionStore";
import styles from "@/src/styles/AuthStyle";
import { useState } from "react";
import LoginUser from "@/src/services/LoginService";
import { Snackbar } from "react-native-paper";

export default function SignIn() {
	const signIn = useSessionStore((state) => state.signIn);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handleSubmit = async () => {
		const { status, data } = await LoginUser({ username, password });
		if (status) {
			signIn(data!.id, data!.username);
			router.replace("/");
			return;
		} else {
			setError(data);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>CONNEXION</Text>
			<TextInput
				style={styles.input}
				placeholder={"Pseudo"}
				placeholderTextColor="#fff"
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder={"Mot de passe"}
				placeholderTextColor="#fff"
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button
				title={"Se connecter"}
				onPress={handleSubmit}
				style={styles.login}
			/>
			<Text style={styles.Textlink}>
				Pas encore de compte ? &nbsp;
				<Link href={"/signup"} style={styles.link}>
					S'inscrire
				</Link>
			</Text>
			<Snackbar visible={error.length > 0} onDismiss={() => setError("")}>
				{error}
			</Snackbar>
		</SafeAreaView>
	);
}
