// Données d'exemple pour l'affichage (si le backend n'est pas disponible)
const exampleCities = [
  {
    id: 1,
    name: "Paris",
    agence: "Agence Paris Centre",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    description:
      "Capitale de la France, connue pour la Tour Eiffel, les musées et la gastronomie.",
    address: "1 Rue de la Paix, 75001 Paris",
    gallery: ["marseille", "lille", "nantes"],
  },
  {
    id: 2,
    name: "Lyon",
    agence: "Agence Lyon Part-Dieu",
    image: "https://images.unsplash.com/photo-1531961463838-b2d6c8875867?w=800",
    description:
      "Ville située au confluent du Rhône et de la Saône, capitale de la gastronomie française.",
    address: "1 Place Bellecour, 69002 Lyon",
    gallery: ["marseille", "lille", "nantes"],
  },
  {
    id: 3,
    name: "Marseille",
    agence: "Agence Marseille Vieux-Port",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    description:
      "Plus grande ville portuaire de France, située sur la Méditerranée.",
    address: "Quai du Port, 13002 Marseille",
    gallery: ["paris", "nice", "toulon"],
  },
  {
    id: 4,
    name: "Lille",
    agence: "Agence Lille Centre",
    description:
      "Ville du nord de la France, connue pour son architecture flamande.",
    address: "Place Rihour, 59000 Lille",
    gallery: ["paris", "bruxelles", "amsterdam"],
  },
  {
    id: 5,
    name: "Nantes",
    agence: "Agence Nantes Centre-Ville",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    description:
      "Ville de l'ouest de la France, sur la Loire, connue pour son château des ducs de Bretagne.",
    address: "Place Royale, 44000 Nantes",
    gallery: ["rennes", "bordeaux", "la-rochelle"],
  },
];

// Fonction pour afficher les villes
function displayCities(cities) {
  const citiesList = document.getElementById("cities-list");
  citiesList.innerHTML = "";

  if (cities.length === 0) {
    citiesList.innerHTML = `
      <div class="empty-state">
        <p>🏙️ Aucune ville enregistrée pour le moment.</p>
        <p>Utilisez le formulaire pour ajouter une ville.</p>
        <a href="ajouter-ville.html" class="btn-primary">➕ Ajouter une ville</a>
      </div>
    `;
    return;
  }

  cities.forEach((city) => {
    const cityCard = document.createElement("div");
    cityCard.className = "city-card";

    // Parser la galerie si c'est une chaîne JSON
    let gallery = [];
    if (city.gallery) {
      try {
        gallery =
          typeof city.gallery === "string"
            ? JSON.parse(city.gallery)
            : city.gallery;
      } catch (e) {
        gallery = [];
      }
    }

    cityCard.innerHTML = `
      <div class="city-header">
        ${
          city.image
            ? `<img src="${city.image}" alt="${city.name}" class="city-image" onerror="this.style.display='none'">`
            : `<div class="city-image-placeholder">🏙️</div>`
        }
        <h3 class="city-name">${city.name}</h3>
      </div>
      <div class="city-body">
        <div class="city-info">
          <p class="city-agence">
            <span class="icon">🏢</span>
            <strong>Agence:</strong> ${city.agence}
          </p>
          ${
            city.description
              ? `<p class="city-description">
                  <span class="icon">📝</span>
                  ${city.description}
                </p>`
              : ""
          }
          ${
            city.address
              ? `<p class="city-address">
                  <span class="icon">📍</span>
                  <strong>Adresse:</strong> ${city.address}
                </p>`
              : ""
          }
        </div>
        ${
          gallery.length > 0
            ? `<div class="gallery">
                <strong>Galerie:</strong>
                <div class="gallery-tags">
                  ${gallery
                    .map((item) => `<span class="gallery-tag">${item}</span>`)
                    .join("")}
                </div>
              </div>`
            : ""
        }
      </div>
    `;

    citiesList.appendChild(cityCard);
  });
}

// Fonction pour charger les villes depuis l'API ou utiliser les données d'exemple
async function loadCities() {
  const citiesList = document.getElementById("cities-list");

  // Afficher un message de chargement
  citiesList.innerHTML =
    '<div class="loading"><p>Chargement des villes...</p></div>';

  try {
    // Essayer de charger depuis l'API
    const response = await fetch("/api/cities");

    if (response.ok) {
      const cities = await response.json();
      displayCities(cities);

      // Afficher un indicateur que les données viennent de l'API
      const section = document.querySelector(".cities-section h2");
      if (section && !section.querySelector(".data-source")) {
        const indicator = document.createElement("span");
        indicator.className = "data-source";
        indicator.textContent = " (depuis la base de données)";
        indicator.style.cssText =
          "font-size: 0.7em; color: #4caf50; font-weight: normal;";
        section.appendChild(indicator);
      }
    } else {
      throw new Error("API non disponible");
    }
  } catch (error) {
    console.log("Backend non disponible, utilisation des données d'exemple");

    // Utiliser les données d'exemple
    displayCities(exampleCities);

    // Afficher un message informatif
    const section = document.querySelector(".cities-section");
    if (section) {
      const existingNote = section.querySelector(".info-note");
      if (!existingNote) {
        const infoNote = document.createElement("div");
        infoNote.className = "info-note";
        infoNote.innerHTML = `
          <p>ℹ️ <strong>Mode démonstration :</strong> Affichage de données d'exemple. 
          Pour voir les vraies données, démarrez le backend avec <code>npm start</code></p>
        `;
        section.insertBefore(infoNote, citiesList);
      }
    }
  }
}

// Charger les villes au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  loadCities();
});
