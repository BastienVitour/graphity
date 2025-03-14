import { Button, SafeAreaView, Text, TextInput } from "react-native";
import { useState } from "react";

import styles from "../styles/AuthStyle";
import { Link, router } from "expo-router";
import RegisterUser from "@/src/services/SignupService";
import UserSignup from "@/src/models/UserSignup";
import useSessionStore from "@/src/zustand/sessionStore";
import { Snackbar } from "react-native-paper";

export default function SignupScreen() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [confirmPasswordError, setConfirmPasswordError] =
		useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const signIn = useSessionStore((state) => state.signIn);

	const handleSubmit = async () => {
		const userToInsert: UserSignup = {
			username: username,
			password: password,
			confirmPassword: confirmPassword
		};
		const { success, message, element, user } =
			await RegisterUser(userToInsert);
		setError(message);
		if (success) {
			setUsernameError(false);
			setPasswordError(false);
			setConfirmPasswordError(false);
			signIn(user!.id, user!.username);
			router.replace("/");
			return;
		} else {
			const elements: string[] = element.split(",");
			setUsernameError(elements.includes("username"));
			setPasswordError(elements.includes("password"));
			setConfirmPasswordError(elements.includes("confirmPassword"));
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>INSCRIPTION</Text>
			<TextInput
				style={{
					...styles.input,
					borderColor: usernameError ? "red" : "grey"
				}}
				placeholder={"Pseudo"}
				placeholderTextColor="#fff"
				onChangeText={setUsername}
			/>
			<TextInput
				style={{
					...styles.input,
					borderColor: passwordError ? "red" : "grey"
				}}
				placeholder={"Mot de passe"}
				placeholderTextColor="#fff"
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TextInput
				style={{
					...styles.input,
					borderColor: confirmPasswordError ? "red" : "grey"
				}}
				placeholder={"Confirmer le mot de passe"}
				placeholderTextColor="#fff"
				onChangeText={setConfirmPassword}
				secureTextEntry
			/>
			<Button title={"S'inscrire"} onPress={handleSubmit} />
			<Text style={styles.Textlink}>
				Vous avez déjà un compte ? &nbsp;
				<Link href={"/login"} style={styles.link}>
					Se connecter
				</Link>
			</Text>
			<Snackbar visible={error.length > 0} onDismiss={() => setError("")}>
				{error}
			</Snackbar>
		</SafeAreaView>
	);
}
