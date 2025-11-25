# 📚 Guide Git pour le Stagiaire

Ce guide vous explique comment utiliser Git pour sauvegarder et partager votre travail sur le projet.

## 🎯 Qu'est-ce que Git ?

Git est un système de contrôle de version qui permet de :

- ✅ Sauvegarder votre travail
- ✅ Suivre les modifications de votre code
- ✅ Partager votre code avec l'équipe
- ✅ Revenir en arrière si nécessaire

## 🚀 Commandes Git de Base

### 1. Vérifier l'état de votre dépôt

Avant de commencer, vérifiez quels fichiers ont été modifiés :

```bash
git status
```

Cette commande vous montre :

- Les fichiers modifiés (en rouge)
- Les fichiers prêts à être ajoutés (en vert)
- Les fichiers non suivis par Git

### 2. Ajouter les fichiers modifiés

Pour préparer vos modifications à être sauvegardées, utilisez :

```bash
git add .
```

**Explication :**

- `git add` : Commande pour ajouter des fichiers
- `.` : Signifie "tous les fichiers modifiés dans le dossier actuel"

**Alternative :** Si vous voulez ajouter un fichier spécifique :

```bash
git add nom-du-fichier.html
```

### 3. Créer un commit (sauvegarde)

Un commit est une sauvegarde de votre travail avec un message descriptif :

```bash
git commit -m "Votre message de description"
```

**Exemples de messages :**

```bash
git commit -m "Ajout du formulaire pour les villes"
git commit -m "Création de la fonction JavaScript pour envoyer les données"
git commit -m "Mise à jour des styles CSS"
git commit -m "Correction d'un bug dans le formulaire"
```

**💡 Conseil :** Utilisez des messages clairs et descriptifs pour expliquer ce que vous avez fait.

### 4. Envoyer vos modifications sur le dépôt distant

Pour partager votre travail et mettre à jour le dépôt en ligne :

```bash
git push
```

Cette commande envoie tous vos commits locaux vers le dépôt distant (GitHub, GitLab, etc.).

## 📝 Processus Complet (Workflow)

Voici le processus complet à suivre après avoir modifié des fichiers :

### Étape 1 : Vérifier ce qui a changé

```bash
git status
```

### Étape 2 : Ajouter les fichiers modifiés

```bash
git add .
```

### Étape 3 : Créer un commit avec un message

```bash
git commit -m "Description de vos modifications"
```

### Étape 4 : Envoyer sur le dépôt distant

```bash
git push
```

## 🔍 Exemple Pratique

Supposons que vous venez de créer le formulaire dans `ajouter-ville.html`. Voici ce que vous feriez :

```bash
# 1. Vérifier les modifications
git status

# 2. Ajouter le fichier modifié
git add ajouter-ville.html

# 3. Créer un commit
git commit -m "Création du formulaire HTML pour ajouter une ville"

# 4. Envoyer sur le dépôt
git push
```

Ou si vous avez modifié plusieurs fichiers :

```bash
# Ajouter tous les fichiers modifiés
git add .

# Créer un commit
git commit -m "Ajout du formulaire et de la fonction JavaScript pour les villes"

# Envoyer
git push
```

## ⚠️ Erreurs Courantes et Solutions

### Erreur : "fatal: not a git repository"

**Problème :** Vous n'êtes pas dans un dépôt Git.

**Solution :** Assurez-vous d'être dans le bon dossier :

```bash
cd /Users/phasna/Documents/Gestion_des_ville
```

### Erreur : "nothing to commit, working tree clean"

**Problème :** Aucun fichier n'a été modifié ou tous les fichiers sont déjà commités.

**Solution :** C'est normal ! Cela signifie que tout est à jour.

### Erreur : "Please tell me who you are"

**Problème :** Git ne connaît pas votre identité.

**Solution :** Configurez votre nom et email :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### Erreur : "failed to push some refs"

**Problème :** Le dépôt distant a des modifications que vous n'avez pas localement.

**Solution :** Récupérez d'abord les modifications :

```bash
git pull
```

Puis réessayez :

```bash
git push
```

## 📋 Checklist Avant de Push

Avant d'envoyer vos modifications, vérifiez :

- [ ] J'ai testé mon code (il fonctionne)
- [ ] J'ai vérifié avec `git status` ce qui va être envoyé
- [ ] Mon message de commit est clair et descriptif
- [ ] Je suis sûr de vouloir partager ces modifications

## 💡 Bonnes Pratiques

### Messages de commit clairs

✅ **Bons exemples :**

- "Ajout du formulaire HTML pour les villes"
- "Création de la fonction loadCities()"
- "Correction du bug dans la validation du formulaire"
- "Mise à jour des styles CSS pour les cartes de villes"

❌ **Mauvais exemples :**

- "modif"
- "test"
- "fix"
- "update"

### Commiter régulièrement

Il est préférable de faire plusieurs petits commits plutôt qu'un gros commit :

- Un commit par fonctionnalité
- Un commit par correction de bug
- Un commit par amélioration

### Toujours vérifier avant de push

```bash
git status
git log --oneline -5  # Voir les 5 derniers commits
```

## 🆘 Besoin d'aide ?

Si vous rencontrez un problème :

1. **Lisez le message d'erreur** - Il contient souvent la solution
2. **Vérifiez avec `git status`** - Pour voir l'état actuel
3. **Demandez de l'aide** - N'hésitez pas à poser des questions

## 📚 Commandes Utiles Supplémentaires

### Voir l'historique des commits

```bash
git log
```

### Voir les différences dans un fichier

```bash
git diff nom-du-fichier
```

### Annuler des modifications non commitées

```bash
git checkout -- nom-du-fichier
```

### Voir les branches

```bash
git branch
```

## 🎉 Résumé Rapide

```bash
# Workflow complet
git status              # Voir ce qui a changé
git add .               # Ajouter tous les fichiers modifiés
git commit -m "Message" # Créer un commit avec un message
git push                # Envoyer sur le dépôt distant
```

**C'est tout !** Avec ces 4 commandes, vous pouvez sauvegarder et partager votre travail. 🚀
