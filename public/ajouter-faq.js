document.addEventListener("DOMContentLoaded", () => {
    const ajouterFaqForm = document.getElementById("ajouter-faq-form");
    if (ajouterFaqForm) {
      ajouterFaqForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const question = document.getElementById("question-faq").value;
        const reponse = document.getElementById("answer-faq").value;
        const thematiqueInput = document.getElementById("thematique-faq").value;
        const thematique = thematiqueInput ?  thematiqueInput.split(",").map((item) => item.trim())
        : [];

        const faqImage = document.getElementById("faq-image").value;
        const faqData = {
          question: question,
          reponse: reponse,
          thematique: thematique,
          faqImage: faqImage
        };
        console.log("Données de la FAQ à ajouter:", faqData);
        fetch("/api/faq", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: question,
                reponse: reponse,
                thematique: thematique,
                faqImage: faqImage

            }), 
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Succès:", data);
            alert("FAQ ajoutée avec succès !");
            document.getElementById("ajouter-faq-form").reset();
            window.location.href = "liste-faq.html";
          })
          .catch((error) => {
            console.error("Erreur:", error);
            alert("Erreur lors de l'ajout de la FAQ");
          });
        });
    }
});