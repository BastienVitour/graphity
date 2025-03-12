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
			return false;
		}

		const users: User[] | null = await GetItemAsync("users");
		if (users === null || users === undefined || users.length === 0) {
			return false;
		}
		const user = users.find((u) => u.username === username);
		if (!user) return false;
		const encryptedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			password
		);
		return user.password === encryptedPassword;
	} catch (error) {
		return false;
	}
};

export default LoginUser;
