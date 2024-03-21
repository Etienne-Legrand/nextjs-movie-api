# Next.js Movie API

Ce projet est une API développée avec Next.js qui permet de gérer une liste de films ainsi que les commentaires associés aux films.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js installé.
3. Déplacez-vous dans le répertoire du projet
4. Exécutez la commande `npm install` pour installer les dépendances.
5. Complétez vos identifiants de connexion à votre base de donnée dans le fichier `.env` pour la variable `MONGODB_URI`.

## Utilisation

1. Exécutez la commande `npm run dev` pour démarrer le serveur de développement.
2. Accédez à http://localhost:3000/api dans votre navigateur pour utiliser l'API.
3. Accédez à http://localhost:3000/swagger dans votre navigateur pour utiliser le swagger de l'API.

## Fonctionnalités

Film :

- Récupérer tous les films
- Ajouter un film
- Modifier un film
- Supprimer un film

Commentaire :

- Récupérer les commentaires d'un film
- Ajouter un commentaire à un film
- Modifier un commmentaire d'un film
- Supprimer un commmentaire d'un film
