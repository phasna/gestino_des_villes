// Données exemple pour l'affichage (si le backend n'est pas disponible)
const exampleFaqs = [
  {
    id: 1,
    question: "Comment créer un compte ?",
    reponse: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite.",
    thematique: "Compte",
    faqImage: "", 
    },
    {
    id: 2,
    question: "Comment réinitialiser mon mot de passe ?",
    reponse: "Pour réinitialiser votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion.",
    thematique: "Sécurité",
    faqImage: "", 
    },
    {
    id: 3,
    question: "Comment contacter le support client ?",
    reponse: "Vous pouvez contacter le support client via le formulaire de contact sur notre site.",
    thematique: "Support",
    faqImage: "", 
    },
];
function displayFaqs(faqs) {
  const faqList = document.getElementById("faq-list");
  
  faqList.innerHTML = "";
  
  if (faqs.length === 0) {
    faqList.innerHTML = `<p>Aucune FAQ disponible.</p>`;
    return;
  }
  
  faqs.forEach((faq) => {
    // Parser la thématique si c'est une chaîne JSON
    let thematique = [];
    if (faq.thematique) {
      try {
        thematique =
          typeof faq.thematique === "string"
            ? JSON.parse(faq.thematique)
            : faq.thematique;
      } catch (e) {
        thematique = [];
      }
    }
    
    faqList.innerHTML += `
      <div class="faq-item"> 
        <h3 class="faq-question">${faq.question}</h3>
        <p class="faq-answer">${faq.reponse}</p>
        <p class="faq-thematique"><strong>Thématique:</strong> ${Array.isArray(thematique) ? thematique.join(', ') : faq.thematique}</p>
        ${faq.faqImage
            ? `<div class="faq-image"><img src="${faq.faqImage}" alt="Image FAQ" /></div>`
            : ""}
      </div>`;
  });
}

// Récupérer les FAQs depuis le backend
async function fetchFaqs() {
  try {
    const response = await fetch("/api/faqs");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des FAQs");
    }
    const data = await response.json();
    displayFaqs(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des FAQs depuis le backend:", error);
    // Afficher les données exemple en cas d'erreur
    displayFaqs(exampleFaqs);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchFaqs();
});