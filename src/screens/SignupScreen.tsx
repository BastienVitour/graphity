import { Button, SafeAreaView, Text, TextInput } from "react-native";
import { useState } from "react";

import styles from "../styles/SignupStyle";
import { Link } from "expo-router";
import RegisterUser from "@/src/services/SignupService";
import UserSignup from "@/src/models/UserSignup";

export default function SignupScreen() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [confirmPasswordError, setConfirmPasswordError] =
		useState<boolean>(false);

	const handleSubmit = async () => {
		const user: UserSignup = {
			username: username,
			password: password,
			confirmPassword: confirmPassword
		};
		const { success, message, element } = await RegisterUser(user);
		alert(message);
		if (success) {
			setUsernameError(false);
			setPasswordError(false);
			setConfirmPasswordError(false);
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
			<Text style={styles.title}>Signup</Text>
			<TextInput
				style={styles.input}
				placeholder={"Pseudo"}
				onChangeText={setUsername}
			/>
			<TextInput
				style={{
					...styles.input,
					borderColor: passwordError ? "red" : "grey"
				}}
				placeholder={"Mot de passe"}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TextInput
				style={{
					...styles.input,
					borderColor: confirmPasswordError ? "red" : "grey"
				}}
				placeholder={"Confirmer le mot de passe"}
				onChangeText={setConfirmPassword}
				secureTextEntry
			/>
			<Button title={"S'inscrire"} onPress={handleSubmit} />
			<Link href={"/login"}>Se connecter</Link>
		</SafeAreaView>
	);
}
