const request = require("supertest"); // Importer l'application Express
const app = require("../app"); // Importer l'application Express

// Tests pour l'API des FAQs
describe("GET /api/faqs", () => {
  test("devrait retourner une liste de FAQs", async () => {
    const res = await request(app).get("/api/faqs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Tests pour créer une nouvelle FAQ
describe("POST /api/faqs", () => {
  test("devrait créer une nouvelle FAQ", async () => {
    const newFaq = {
      question: "Comment puis-je réinitialiser mon mot de passe ?",
      reponse: "Vous pouvez réinitialiser votre mot de passe en cliquant sur 'Mot de passe oublié' sur la page de connexion.",
      thematique: ["Compte", "Sécurité"],
      faqImage: "reset-password.png",
    };
    const res = await request(app)
        .post("/api/faqs")
        .send(newFaq)
        .set("Accept", "application/json");
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.message).toBe("FAQ créée avec succès");
  });
});
// Test validation des champs requis
describe("POST /api/faqs - validation", () => {
  test("devrait retourner une erreur si la question est manquante", async () => {
    const faqWithoutQuestion = {
      reponse: "Ceci est une réponse sans question.",
        thematique: ["Général"],
        faqImage: "no-question.png",
    };

    const res = await request(app)
        .post("/api/faqs")
        .send(faqWithoutQuestion)
        .set("Content-Type", "application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("devrait retourner une erreur si la réponse est manquante", async () => {
    const faqWithoutReponse = {
      question: "Ceci est une question sans réponse.",
        thematique: ["Général"],
        faqImage: "no-reponse.png",
    };
    const res = await request(app)
        .post("/api/faqs")
        .send(faqWithoutReponse)
        .set("Content-Type", "application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
