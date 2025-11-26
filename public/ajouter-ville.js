// ============================================
// EXEMPLE DE GESTION DE FORMULAIRE (à ne pas utiliser tel quel)
// Ce code montre comment gérer un formulaire, mais avec des champs différents
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Exemple de formulaire (ne correspond pas à la base de données)
  const exampleForm = document.getElementById("example-form");

  if (exampleForm) {
    exampleForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêche le rechargement de la page

      // 1. Récupérer les valeurs du formulaire
      const nom = document.getElementById("example-nom").value;
      const email = document.getElementById("example-email").value;
      const telephone = document.getElementById("example-telephone").value;
      const message = document.getElementById("example-message").value;

      // 2. Créer un objet avec les données
      const formData = {
        nom: nom,
        email: email,
        telephone: telephone,
        message: message,
      };

      // 3. Afficher les données dans la console (pour l'exemple)
      console.log("Données du formulaire exemple:", formData);
      alert(
        "⚠️ Ceci est un EXEMPLE ! Ces données ne correspondent pas à la base de données.\n\n" +
          "Vous devez créer votre propre formulaire avec les champs :\n" +
          "- name\n- agence\n- image\n- description\n- address\n- gallery"
      );

      // 4. Réinitialiser le formulaire
      exampleForm.reset();

      // NOTE: Ce formulaire n'envoie PAS de données au serveur car les champs ne correspondent pas
      // Vous devez créer votre propre formulaire avec les bons champs !
    });
  }
});

// ============================================
// TODO: Créer votre propre fonction pour gérer le formulaire de villes
// ============================================
// Cette fonction devra:
// 1. Récupérer les valeurs du formulaire (name, agence, image, description, address, gallery)
// 2. Créer un objet avec les données correspondant à la base de données
// 3. Envoyer une requête POST à /api/cities avec fetch()
// 4. Rediriger vers la liste des villes après l'ajout
// 5. Réinitialiser le formulaire
//
// Exemple de structure à envoyer:
// {
//   name: "Paris",
//   agence: "Agence Paris Centre",
//   image: "https://example.com/paris.jpg",
//   description: "Capitale de la France",
//   address: "1 Rue de la Paix, 75001 Paris",
//   gallery: ["marseille", "lille", "nantes"]
// }
document.addEventListener("DOMContentLoaded", () => {
  const ajouterVilleForm = document.getElementById("ajouter-ville-form");
  if (ajouterVilleForm) {
    ajouterVilleForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("nom-ville").value;
      const agence = document.getElementById("agence-ville").value;
      const image = document.getElementById("image-ville").value;
      const description = document.getElementById("description-ville").value;
      const address = document.getElementById("address-ville").value;
      const galleryInput = document.getElementById("gallery-ville").value;
      const gallery = galleryInput
        ? galleryInput.split(",").map((item) => item.trim())
        : [];

      const villeData = {
        name: name,
        agence: agence,
        image: image,
        description: description,
        address: address,
        gallery: gallery,
      };
      console.log("Données de la ville à ajouter:", villeData);
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
          alert("Ville ajoutée avec succès !");
          document.getElementById("ajouter-ville-form").reset();
          window.location.href = "liste-villes.html";
        })
        .catch((error) => {
          console.error("Erreur:", error);
          alert("Erreur lors de l'ajout de la ville");
        });
    });
  }
  
});