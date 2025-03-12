import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetItemAsync = async (key: string) => {
	try {
		const jsonValue: string | null = await AsyncStorage.getItem(key);
		if (jsonValue === null) return null;
		return JSON.parse(jsonValue);
	} catch (error) {
		alert(`Une erreur est survenue ${error}`);
		return null;
	}
};

export const SetItemAsync = async (key: string, data: any) => {
	try {
		const jsonValue = JSON.stringify(data);
		await AsyncStorage.setItem(key, jsonValue);
		return true;
	} catch (error) {
		alert(`Une erreur est survenue ${error}`);
		return false;
	}
};
