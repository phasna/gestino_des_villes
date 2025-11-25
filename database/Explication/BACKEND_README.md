# 🔧 Documentation Backend

## Structure du Backend

Le backend est situé dans le fichier `server.js` à la racine du projet.

## Technologies utilisées

- **Express.js** : Framework web pour Node.js
- **MySQL2** : Driver MySQL pour Node.js
- **CORS** : Middleware pour gérer les requêtes cross-origin
- **dotenv** : Gestion des variables d'environnement

## Routes API disponibles

### GET /api/cities

Récupère toutes les villes de la base de données.

**Réponse** :

```json
[
  {
    "id": 1,
    "name": "Paris",
    "agence": "Agence Paris Centre",
    "image": "https://example.com/paris.jpg",
    "description": "Capitale de la France",
    "address": "1 Rue de la Paix, 75001 Paris",
    "gallery": "[\"marseille\", \"lille\", \"nantes\"]",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/cities/:id

Récupère une ville spécifique par son ID.

**Paramètres** :

- `id` : ID de la ville (dans l'URL)

**Réponse** :

```json
{
  "id": 1,
  "name": "Paris",
  "agence": "Agence Paris Centre",
  ...
}
```

### POST /api/cities

Crée une nouvelle ville.

**Corps de la requête** :

```json
{
  "name": "Paris",
  "agence": "Agence Paris Centre",
  "image": "https://example.com/paris.jpg",
  "description": "Capitale de la France",
  "address": "1 Rue de la Paix, 75001 Paris",
  "gallery": ["marseille", "lille", "nantes"]
}
```

**Champs requis** :

- `name` (string)
- `agence` (string)

**Champs optionnels** :

- `image` (string)
- `description` (string)
- `address` (string)
- `gallery` (array de strings)

**Réponse** :

```json
{
  "id": 1,
  "message": "Ville créée avec succès"
}
```

### PUT /api/cities/:id

Met à jour une ville existante.

**Paramètres** :

- `id` : ID de la ville (dans l'URL)

**Corps de la requête** : Même format que POST

**Réponse** :

```json
{
  "message": "Ville mise à jour avec succès"
}
```

### DELETE /api/cities/:id

Supprime une ville.

**Paramètres** :

- `id` : ID de la ville (dans l'URL)

**Réponse** :

```json
{
  "message": "Ville supprimée avec succès"
}
```

## Configuration

Le backend utilise un fichier `.env` pour la configuration. Créez ce fichier à la racine du projet :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gestion_des_villes
PORT=3000
```

## Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage du serveur
npm start

# Ou en mode développement (avec rechargement automatique)
npm run dev
```

Le serveur sera accessible sur : `http://localhost:3000`

## Test des routes API

Vous pouvez tester les routes API avec :

1. **cURL** :

```bash
# Récupérer toutes les villes
curl http://localhost:3000/api/cities

# Créer une ville
curl -X POST http://localhost:3000/api/cities \
  -H "Content-Type: application/json" \
  -d '{"name":"Paris","agence":"Agence Paris","description":"Capitale"}'
```

2. **Postman** : Importez les routes et testez-les

3. **Navigateur** : Visitez `http://localhost:3000/api/cities` pour voir toutes les villes

## Gestion des erreurs

Le backend gère les erreurs suivantes :

- **400** : Requête invalide (champs requis manquants)
- **404** : Ressource non trouvée
- **500** : Erreur serveur (erreur base de données, etc.)

Toutes les erreurs retournent un JSON avec un champ `error` :

```json
{
  "error": "Message d'erreur"
}
```
