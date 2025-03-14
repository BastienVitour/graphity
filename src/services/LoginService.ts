import { GetItemAsync } from "@/src/utils/AsyncStorageService";
import User from "@/src/models/User";
import * as Crypto from "expo-crypto";

const LoginUser = async ({
	username,
	password
}: {
	username: string;
	password: string;
}) => {
	try {
		if (
			username === null ||
			password === null ||
			password === "" ||
			username === ""
		) {
			return { status: false, data: "Veuillez remplir tous les champs" };
		}

		const users: User[] | null = await GetItemAsync("users");
		if (users === null || users === undefined || users.length === 0) {
			return { status: false, data: "Utilisateur inexistant" };
		}
		const user = users.find((u) => u.username === username);
		if (!user) return { status: false, data: "Utilisateur inexistant" };
		const encryptedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			password
		);
		if (user.password === encryptedPassword) {
			return { status: true, data: { id: user.id, username: username } };
		} else {
			return { status: false, data: "Mot de passe incorrect" };
		}
	} catch (error) {
		return { status: false, data: "La connexion a échoué" };
	}
};

export default LoginUser;
