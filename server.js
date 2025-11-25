const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuration de la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "gestion_des_villes",
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Routes API

// Récupérer toutes les villes
app.get("/api/cities", (req, res) => {
  const query = "SELECT * FROM citie ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des villes" });
    }
    res.json(results);
  });
});

// Récupérer une ville par ID
app.get("/api/cities/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM citie WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la ville" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Ville non trouvée" });
    }
    res.json(results[0]);
  });
});

// Créer une nouvelle ville
app.post("/api/cities", (req, res) => {
  const { name, agence, image, description, address, gallery } = req.body;

  // Validation des champs requis
  if (!name || !agence) {
    return res
      .status(400)
      .json({ error: "Les champs name et agence sont requis" });
  }

  const query =
    "INSERT INTO citie (name, agence, image, description, address, gallery) VALUES (?, ?, ?, ?, ?, ?)";
  const galleryJson = Array.isArray(gallery)
    ? JSON.stringify(gallery)
    : gallery;

  db.query(
    query,
    [
      name,
      agence,
      image || null,
      description || null,
      address || null,
      galleryJson || null,
    ],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de la ville" });
      }
      res
        .status(201)
        .json({ id: results.insertId, message: "Ville créée avec succès" });
    }
  );
});

// Mettre à jour une ville
app.put("/api/cities/:id", (req, res) => {
  const { id } = req.params;
  const { name, agence, image, description, address, gallery } = req.body;

  const query =
    "UPDATE citie SET name = ?, agence = ?, image = ?, description = ?, address = ?, gallery = ? WHERE id = ?";
  const galleryJson = Array.isArray(gallery)
    ? JSON.stringify(gallery)
    : gallery;

  db.query(
    query,
    [name, agence, image, description, address, galleryJson, id],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour de la ville" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Ville non trouvée" });
      }
      res.json({ message: "Ville mise à jour avec succès" });
    }
  );
});

// Supprimer une ville
app.delete("/api/cities/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM citie WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression de la ville" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Ville non trouvée" });
    }
    res.json({ message: "Ville supprimée avec succès" });
  });
});

// Route pour servir la page HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
