const request = require("supertest");// Importer l'application Express
const app = require("../server");// Importer l'application Express

// Tests pour l'API des villes
describe("GET /api/cities", () => {
  test("devrait retourner une liste de villes", async () => {
    const res = await request(app).get("/api/cities");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Tests pour créer une nouvelle ville
describe("POST /api/cities", () => {
    test("devrait créer une nouvelle ville", async () => {
        const newCity = {
            name: "Test City",
            agence: "Test Agency",
            image: "test-image.jpg",
            description: "This is a test city.",
            address: "123 Test St, Testville",
            gallery: ["autre ville", "autre ville"]
        };

        const res = await request(app)
            .post("/api/cities")
            .send(newCity)
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.name).toBe(newCity.name);
        expect(res.body.agence).toBe(newCity.agence);
    });
});
// Test validation des champs requis
describe("POST /api/cities - validation", () => {
    
    test("devrait retourner une erreur si le nom est manquant", async () => {
        const cityWithoutName = {
            agence: "Test Agence",
            image: "test-image.jpg",
            description: "Description test"
        };
        
        const res = await request(app)
            .post("/api/cities")
            .send(cityWithoutName)
            .set("Content-Type", "application/json");
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
        
    });

    test("devrait retourner une erreur si l'agence est manquante", async () => {
        const cityWithoutAgence = {
            name: "Test City",
            image: "test-image.jpg",
            description: "Description test"
        };
        
        const res = await request(app)
            .post("/api/cities")
            .send(cityWithoutAgence)
            .set("Content-Type", "application/json");
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
        
    });

    test("devrait retourner une erreur si tous les champs requis sont manquants", async () => {
        const incompleteCity = {
            image: "test-image.jpg",
            description: "This is a test city without required fields.",
            address: "123 Test St, Testville",
            gallery: ["autre ville", "autre ville"]
        };
        
        const res = await request(app)
            .post("/api/cities")
            .send(incompleteCity)
            .set("Content-Type", "application/json");
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });

    test("devrait retourner une erreur pour un nom vide", async () => {
        const cityEmptyName = {
            name: "",
            agence: "Test Agence"
        };
        
        const res = await request(app)
            .post("/api/cities")
            .send(cityEmptyName)
            .set("Content-Type", "application/json");
        
        expect(res.statusCode).toBe(400);
    });

    test("devrait retourner une erreur pour une agence vide", async () => {
        const cityEmptyAgence = {
            name: "Test City",
            agence: ""
        };
        
        const res = await request(app)
            .post("/api/cities")
            .send(cityEmptyAgence)
            .set("Content-Type", "application/json");
        
        expect(res.statusCode).toBe(400);
    });

    test("devrait retourner une erreur pour un body vide", async () => {
        const res = await request(app)
            .post("/api/cities")
            .send({})
            .set("Content-Type", "application/json");
        
        expect(res.statusCode).toBe(400);
    });
});
// Tests pour les cas limites lors de la création d'une ville
describe("POST /api/cities - cas limites", () => {
    
    test("devrait accepter des caractères spéciaux dans le nom", async () => {
        const citySpecial = {
            name: "Saint-Étienne-du-Rouvray (Île-de-France)",
            agence: "Agence Île-de-France"
        };
        
        const res = await request(app)
            .post("/api/cities")
            .send(citySpecial)
            .set("Content-Type", "application/json");
        
        expect(res.statusCode).toBe(201);
    });

    test("devrait gérer des noms très longs", async () => {
        const cityLongName = {
            name: "A".repeat(255), // Nom de 255 caractères
            agence: "Test Agence"
        };
        
        const res = await request(app)
            .post("/api/cities")
            .send(cityLongName)
            .set("Content-Type", "application/json");
        
       
        expect([201, 400, 500]).toContain(res.statusCode);
    });
});
// Tests pour la mise à jour d'une ville
describe("PUT /api/cities/:id", () => {
  test("devrait mettre à jour une ville existante", async () => {
    const updatedCity = {
        name: "Updated Test City",
        agence: "Updated Test Agency",
        image: "updated-image.jpg",
        description: "This is an updated test city.",
        address: "456 Updated St, Testville",
        gallery: ["ville mise à jour", "autre ville"]
    };
    
    const res = await request(app)
        .put("/api/cities/1") // Remplace "1" par un ID valide dans ta base de données
        .send(updatedCity)
        .set("Content-Type", "application/json");
    
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedCity.name);
    expect(res.body.agence).toBe(updatedCity.agence);
  });
});
//Tests pour la mise à jour d'une ville - cas limites
describe("PUT /api/cities/:id - cas limites", () => {
  test("devrait retourner une erreur lors de la mise à jour d'une ville inexistante", async () => {
    const updatedCity = {
        name: "Nonexistent City",
        agence: "No Agency"
    };
    const res = await request(app)
        .put("/api/cities/99999") // ID supposé inexistant
        .send(updatedCity)
        .set("Content-Type", "application/json");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

// Tests pour récupérer une ville par ID
describe("GET /api/cities/:id", () => {
  test("devrait retourner une ville existante par ID", async () => {
    const res = await request(app).get("/api/cities/1"); // Remplace "1" par un ID valide dans ta base de données
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  test("devrait retourner une erreur pour une ville inexistante", async () => {
    const res = await request(app).get("/api/cities/99999"); // ID supposé inexistant
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
// Tests pour la suppression d'une ville
describe("DELETE /api/cities/:id", () => {
  test("devrait supprimer une ville existante", async () => {
    const res = await request(app).delete("/api/cities/1"); // Remplace "1" par un ID valide dans ta base de données
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("devrait retourner une erreur lors de la suppression d'une ville inexistante", async () => {
    const res = await request(app).delete("/api/cities/99999"); // ID supposé inexistant
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});