const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'votre_clé_secrète'; 

router.get('/admin/users', (req, res) => {
    const sql = 'SELECT * FROM User';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
      } else {
        res.json(results);
      }
    });
  });
  

router.post('/register', async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO User (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, firstname, lastname, email, hashedPassword], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
      } else {
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Vérifiez si l'utilisateur existe dans la base de données
    const sql = 'SELECT * FROM User WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }
  
      const user = results[0];
  
      // Vérifiez le mot de passe
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }
  
      // Générez un token JWT
      const token = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: '1h' }); // Le token expire dans 1 heure
  
      res.json({ token });
    });
  });


module.exports = router;
