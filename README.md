# 🏙️ Gestion des Villes

Application de gestion des villes développée avec Express.js, MySQL, HTML et CSS.

## 📦 Installation

1. Installer les dépendances :

```bash
npm install
```

2. Créer un fichier `.env` à la racine du projet avec le contenu suivant :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=gestion_des_villes
PORT=3000
```

3. Créer la base de données en exécutant le script SQL :

```bash
mysql -u root -p < database/schema.sql
```

4. Démarrer le serveur :

```bash
npm start
```

Ou en mode développement :

```bash
npm run dev
```

## 📚 Documentation

Consultez le fichier `EXPLICATION_STAGIAIRE.md` pour les instructions détaillées destinées au stagiaire.

## 🗄️ Structure de la Base de Données

- Base de données : `gestion_des_villes`
- Table : `citie`

Voir `database/schema.sql` pour plus de détails.
# gestino_des_villes
