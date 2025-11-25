# 📚 Guide pour le Stagiaire - Gestion des Villes

Bienvenue ! Ce projet est une application de gestion des villes. Votre mission est de compléter le formulaire HTML pour permettre l'ajout de nouvelles villes dans la base de données.

## 🎯 Objectif

Créer un formulaire HTML fonctionnel qui permet de saisir les informations d'une ville et de les enregistrer dans la base de données.

## 📋 Structure du Projet

```
Gestion_des_ville/
├── database/
│   └── schema.sql              # Script SQL pour créer la base de données
├── public/
│   ├── index.html              # Page d'accueil avec navigation
│   ├── liste-villes.html       # Page pour afficher toutes les villes
│   ├── ajouter-ville.html      # Page pour ajouter une ville (à compléter)
│   ├── style.css               # Styles CSS (partagés)
│   ├── script.js               # JavaScript pour index.html
│   ├── liste-villes.js         # JavaScript pour liste-villes.html
│   └── ajouter-ville.js        # JavaScript pour ajouter-ville.html (à compléter)
├── server.js                   # Serveur Express (déjà configuré)
├── package.json                # Dépendances du projet
└── EXPLICATION_STAGIAIRE.md    # Ce fichier
```

### 📄 Pages disponibles

- **`index.html`** : Page d'accueil avec navigation
- **`liste-villes.html`** : Affiche toutes les villes enregistrées (déjà fonctionnel)
- **`ajouter-ville.html`** : Formulaire pour ajouter une nouvelle ville (à compléter)

## 🗄️ Structure de la Base de Données

La table `citie` contient les champs suivants :

| Champ         | Type         | Description                                              | Requis |
| ------------- | ------------ | -------------------------------------------------------- | ------ |
| `id`          | INT          | Identifiant unique (auto-incrémenté)                     | Auto   |
| `name`        | VARCHAR(255) | Nom de la ville                                          | ✅ Oui |
| `agence`      | VARCHAR(255) | Nom de l'agence                                          | ✅ Oui |
| `image`       | VARCHAR(500) | URL de l'image                                           | ❌ Non |
| `description` | TEXT         | Description de la ville                                  | ❌ Non |
| `address`     | VARCHAR(500) | Adresse de la ville                                      | ❌ Non |
| `gallery`     | JSON         | Tableau de villes (ex: ["marseille", "lille", "nantes"]) | ❌ Non |
| `created_at`  | TIMESTAMP    | Date de création                                         | Auto   |
| `updated_at`  | TIMESTAMP    | Date de mise à jour                                      | Auto   |

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer la base de données

1. Créez un fichier `.env` à la racine du projet (copiez `.env.example`)
2. Modifiez les informations de connexion à votre base de données MySQL :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gestion_des_villes
PORT=3000
```

### 3. Créer la base de données

Exécutez le script SQL dans votre client MySQL (phpMyAdmin, MySQL Workbench, ou ligne de commande) :

```bash
mysql -u root -p < database/schema.sql
```

Ou importez le fichier `database/schema.sql` via votre interface MySQL.

### 4. Démarrer le serveur

**Pour le frontend uniquement (sans backend) :**

```bash
npm run front
```

**Pour le frontend + backend (avec base de données) :**

```bash
npm start
```

Ou en mode développement (avec rechargement automatique) :

```bash
npm run dev
```

Le serveur sera accessible sur : http://localhost:3000

### 5. Accéder aux pages

Une fois le serveur démarré, vous pouvez accéder à :

- **Page d'accueil** : http://localhost:3000/index.html
- **Liste des villes** : http://localhost:3000/liste-villes.html
- **Ajouter une ville** : http://localhost:3000/ajouter-ville.html

💡 **Note** : La navigation entre les pages est disponible en haut de chaque page.

## 📝 Votre Mission : Créer le Formulaire

### 📍 Où travailler ?

Vous devez travailler dans le fichier **`public/ajouter-ville.html`** pour créer votre formulaire.

Cette page contient déjà :

- ✅ Un formulaire d'exemple (pour apprendre la structure)
- ✅ Une section vide où vous devez créer votre formulaire
- ✅ La navigation vers les autres pages

### Étape 1 : Créer la structure HTML du formulaire

Dans le fichier `public/ajouter-ville.html`, dans la section avec la classe `form-section` (après le formulaire d'exemple), créez un formulaire avec les champs suivants :

1. **name** (input type="text", requis)
2. **agence** (input type="text", requis)
3. **image** (input type="url" ou type="text", optionnel)
4. **description** (textarea, optionnel)
5. **address** (input type="text", optionnel)
6. **gallery** (input type="text" où l'utilisateur peut entrer les villes séparées par des virgules, optionnel)

N'oubliez pas :

- D'ajouter un attribut `id` ou `name` à chaque champ
- D'ajouter un `<label>` pour chaque champ
- D'ajouter l'attribut `required` pour les champs obligatoires
- D'ajouter un bouton de type "submit"

### Étape 2 : Ajouter les styles CSS

Dans `public/style.css`, vous pouvez utiliser les classes déjà définies (`.form-group`, `label`, `input`, `textarea`, `button`) ou créer vos propres styles.

### Étape 3 : Créer la fonction JavaScript pour envoyer les données

Dans le fichier `public/ajouter-ville.js`, créez une fonction qui :

1. **Écoute l'événement de soumission du formulaire** :

   ```javascript
   document
     .getElementById("votre-form-id")
     .addEventListener("submit", handleSubmit);
   ```

2. **Récupère les valeurs du formulaire** :

   ```javascript
   const name = document.getElementById("name").value;
   const agence = document.getElementById("agence").value;
   // ... etc
   ```

3. **Prépare les données pour la galerie** :
   Si l'utilisateur entre "marseille, lille, nantes", convertissez cela en tableau :

   ```javascript
   const galleryInput = document.getElementById("gallery").value;
   const gallery = galleryInput
     ? galleryInput.split(",").map((item) => item.trim())
     : [];
   ```

4. **Envoie les données au serveur avec fetch()** :

   ```javascript
   fetch("/api/cities", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       name: name,
       agence: agence,
       image: image,
       description: description,
       address: address,
       gallery: gallery,
     }),
   })
     .then((response) => response.json())
     .then((data) => {
       console.log("Succès:", data);
       // Afficher un message de succès
       alert("Ville ajoutée avec succès !");
       // Réinitialiser le formulaire
       document.getElementById("votre-form-id").reset();
       // Optionnel : Rediriger vers la liste des villes
       // window.location.href = "liste-villes.html";
     })
     .catch((error) => {
       console.error("Erreur:", error);
       alert("Erreur lors de l'ajout de la ville");
     });
   ```

5. **Empêche le rechargement de la page** :
   ```javascript
   event.preventDefault();
   ```

## 🔍 API Disponible

Le serveur Express expose les endpoints suivants :

### GET /api/cities

Récupère toutes les villes.

### GET /api/cities/:id

Récupère une ville par son ID.

### POST /api/cities

Crée une nouvelle ville.

**Corps de la requête (JSON)** :

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

### PUT /api/cities/:id

Met à jour une ville existante.

### DELETE /api/cities/:id

Supprime une ville.

## 💡 Conseils

1. **Testez votre formulaire** : Utilisez la console du navigateur (F12) pour voir les erreurs éventuelles.

2. **Validation côté client** : Ajoutez une validation pour vérifier que les champs requis sont remplis avant d'envoyer.

3. **Feedback utilisateur** : Affichez un message de succès ou d'erreur après la soumission.

4. **Format de la galerie** : Le champ `gallery` attend un tableau JSON. Si l'utilisateur entre "ville1, ville2, ville3", convertissez-le en `["ville1", "ville2", "ville3"]`.

5. **Gestion des erreurs** : Gérez les cas d'erreur (champs manquants, erreur serveur, etc.).

## ✅ Checklist

- [ ] Formulaire HTML créé avec tous les champs
- [ ] Labels et attributs `required` ajoutés
- [ ] Fonction JavaScript pour gérer la soumission
- [ ] Données envoyées correctement au serveur
- [ ] Liste des villes se met à jour après l'ajout
- [ ] Formulaire se réinitialise après la soumission
- [ ] Gestion des erreurs implémentée
- [ ] Styles CSS appliqués

## 🆘 Besoin d'aide ?

Si vous êtes bloqué :

1. Vérifiez la console du navigateur pour les erreurs JavaScript
2. Vérifiez la console du serveur pour les erreurs backend
3. Testez les endpoints API avec Postman ou un autre outil
4. Consultez la documentation MDN pour `fetch()` et les formulaires HTML

## 🎉 Bonne chance !

Une fois terminé, vous devriez pouvoir :

- ✅ Voir la liste des villes existantes sur `liste-villes.html`
- ✅ Ajouter une nouvelle ville via le formulaire sur `ajouter-ville.html`
- ✅ Naviguer entre les pages grâce au menu de navigation
- ✅ Voir la nouvelle ville apparaître dans la liste après l'ajout

## 📚 Fichiers à modifier

Pour compléter votre mission, vous devez modifier :

1. **`public/ajouter-ville.html`** : Ajouter le formulaire HTML avec les champs de la base de données
2. **`public/ajouter-ville.js`** : Créer la fonction JavaScript pour envoyer les données au serveur

Les autres fichiers sont déjà fonctionnels :

- ✅ `liste-villes.html` et `liste-villes.js` : Affichage des villes (déjà fait)
- ✅ `style.css` : Styles CSS (déjà fait)
- ✅ `server.js` : Backend API (déjà fait)
