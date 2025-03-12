import { Link, router } from "expo-router";
import { Button, SafeAreaView, Text, TextInput } from "react-native";

import useSessionStore from "@/src/zustand/sessionStore";
import styles from "@/src/styles/SignupStyle";
import { useState } from "react";
import LoginUser from "@/src/services/LoginService";

export default function SignIn() {
	const signIn = useSessionStore((state) => state.signIn);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = async () => {
		const result = await LoginUser({ username, password });
		if (result) {
			signIn();
			router.replace("/");
			return;
		} else {
			alert("La connexion a échoué");
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
		</SafeAreaView>
	);
}
