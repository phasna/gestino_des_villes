-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestion_des_villes;
USE gestion_des_villes;

-- Création de la table citie
CREATE TABLE IF NOT EXISTS citie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    agence VARCHAR(255) NOT NULL,
    image VARCHAR(500),
    description TEXT,
    address VARCHAR(500),
    gallery JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de quelques données d'exemple (optionnel)
INSERT INTO citie (name, agence, image, description, address, gallery) VALUES
('Paris', 'Agence Paris Centre', 'https://example.com/paris.jpg', 'Capitale de la France', '1 Rue de la Paix, 75001 Paris', '["marseille", "lille", "nantes"]'),
('Lyon', 'Agence Lyon Part-Dieu', 'https://example.com/lyon.jpg', 'Ville située au confluent du Rhône et de la Saône', '1 Place Bellecour, 69002 Lyon', '["marseille", "lille", "nantes"]');

