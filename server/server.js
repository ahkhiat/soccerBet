
const express = require('express');
const cors = require('cors')
const db = require('./db'); // Importer la connexion à la BDD
const path = require('path')
const fs = require('fs')

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

// Fonction pour charger automatiquement les routes
const loadRoutes = (app) => {
    const routesPath = path.join(__dirname, 'routes');
    fs.readdirSync(routesPath).forEach((file) => {
      if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        app.use(route); // Utilise les chemins définis dans chaque fichier
      }
    });
  };

// Appelle la fonction pour charger les routes
loadRoutes(app);

app.listen(PORT, () => {
  console.log(`Serveur Express lancé sur le port ${PORT}`);
});
