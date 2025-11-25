// Serveur HTTP simple pour servir uniquement les fichiers statiques (HTML, CSS, JS)
// Sans backend Express/MySQL

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Route par défaut vers index.html
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(__dirname, "public", filePath);

  // Sécurité : empêcher l'accès en dehors du dossier public
  const publicPath = path.join(__dirname, "public");
  if (!filePath.startsWith(publicPath)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Accès interdit");
    return;
  }

  // Lire le fichier
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Fichier non trouvé");
      } else {
        res.writeHead(500);
        res.end(`Erreur serveur: ${err.code}`);
      }
    } else {
      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || "application/octet-stream";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Serveur statique démarré sur http://localhost:${PORT}`);
  console.log(
    `📁 Servant les fichiers depuis: ${path.join(__dirname, "public")}`
  );
  console.log(`\n🌐 Ouvrez votre navigateur: http://localhost:${PORT}`);
  console.log(
    `\n⚠️  Note: Les appels API ne fonctionneront pas (pas de backend)`
  );
  console.log(`   Pour arrêter: Ctrl + C\n`);
});
