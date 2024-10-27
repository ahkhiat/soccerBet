
const express = require('express');
const cors = require('cors')
const db = require('./db'); // Importer la connexion à la BDD

const app = express();
const PORT = 5001;

app.use(cors());

// Endpoint pour récupérer tous les utilisateurs
app.get('http://localhost:5001/admin/users', (req, res) => {
  const sql = 'SELECT * FROM User';
  
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Serveur Express lancé sur le port ${PORT}`);
});
