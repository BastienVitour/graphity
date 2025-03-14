import { SafeAreaView, ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";

export default function ReadmeScreen() {
	const readme = `
# Projet Graphity

## Groupe 4

- BOISSY Adam : Liste des gifs, filtres et recherche
- QUATRAVAUX Julien : Upload de gifs
- VITOUR Bastien : Inscription / connexion, système de favoris
- XIONG Lenny : Détail d'un gif

## Description

Ce projet utilise l'[api de Giphy](https://developers.giphy.com/docs/api/#quick-start-guide) pour lister, uploader et mettre en favoris des gifs

## Fonctionnalités

- Inscription
	- Vérification de la validité du pseudo (pseudo unique)
	- Vérification du mot de passe
	- Mot de passe supérieur à 8 caractères
	- Mot de passe et confirmation identiques
	- Hashage du mot de passe
	- Insertion de l'utilisateur dans l'AsyncStorage

- Connexion
	- Vérification des informations (pseudo et mdp)
	- Mise à jour de la session en cours

- Page d'accueil
	- Liste des médias disponibles (médias récents / trending en priorité)
	- Filtre des médias par type (gifs / stickers)
	- Recherche de médias
	- Ajout d'un média en favori

- Page de détails
	- Liste de détails sur le média sélectionné
	- Description
	- Date d'upload
	- Classification
	- Type
	- Détails supplémentaires (id, source...)

- Page de favoris
	- Récupération des médias ajoutés en favori par l'utilisateur actuel

- Page d'upload
	- Accès à la caméra de l'utilisateur
	- Accès à la galerie de l'utilisateur
	- Upload d'une vidéo sur l'api Giphy
`;

	return (
		<SafeAreaView style={{ flex: 1, padding: 10 }}>
			<ScrollView>
				<Markdown>{readme}</Markdown>
			</ScrollView>
		</SafeAreaView>
	);
}
