import UserSignup from "@/src/models/UserSignup";
import User from "@/src/models/User";
import { GetItemAsync, SetItemAsync } from "@/src/utils/AsyncStorageService";
import * as Crypto from "expo-crypto";

const RegisterUser = async (user: UserSignup) => {
	try {
		if (user.username === null || user.username.length === 0) {
			return {
				success: false,
				message: "Le pseudo est requis",
				element: "username"
			};
		}
		if (user.password === null || user.password.length === 0) {
			return {
				success: false,
				message: "Le mot de passe est requis",
				element: "password"
			};
		}
		if (user.password.length < 8) {
			return {
				success: false,
				message: "Le mot de passe doit faire au moins 8 caractères",
				element: "password"
			};
		}
		if (user.password !== user.confirmPassword) {
			return {
				success: false,
				message: "Les mots de passe ne sont pas identiques",
				element: "password,confirmPassword"
			};
		}
		const isUsernameValid: boolean = await CheckUsernameValidity(
			user.username
		);
		if (!isUsernameValid) {
			return {
				success: false,
				message: "Ce pseudo est déjà utilisé",
				element: "username"
			};
		}
		const { status, data } = await InsertUser(user);
		if (status) {
			return {
				success: true,
				message: "L'utilisateur a bien été enregistré",
				element: "",
				user: data
			};
		} else {
			return {
				success: false,
				message: `Une erreur est survenue`,
				element: ""
			};
		}
	} catch (error) {
		return {
			success: false,
			message: `Une erreur est survenue : ${error}`,
			element: ""
		};
	}
};

export default RegisterUser;

const CheckUsernameValidity = async (username: string) => {
	try {
		const users: User[] = await GetItemAsync("users");
		if (users === null || users === undefined || users.length === 0)
			return true;
		return !users.find((e) => e.username === username);
	} catch (error) {
		return false;
	}
};

const InsertUser = async (user: UserSignup) => {
	try {
		const userId: string = Crypto.randomUUID();
		const encryptedPassword: string = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			user.password!
		);
		const dataToInsert = {
			id: userId,
			username: user.username,
			password: encryptedPassword
		};
		const users = await GetItemAsync("users");
		let result: boolean = false;
		if (users === null || users === undefined || users.length === 0) {
			result = await SetItemAsync("users", [dataToInsert]);
		} else {
			result = await SetItemAsync("users", [...users, dataToInsert]);
		}
		return { status: result, data: dataToInsert };
	} catch (error) {
		return { status: false };
	}
};
