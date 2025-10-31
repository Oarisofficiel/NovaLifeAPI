const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuration de la base MySQL NorthHost
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


db.connect(err => {
  if (err) {
    console.error("❌ Erreur connexion MySQL :", err.message);
  } else {
    console.log("✅ Connecté à la base MySQL NorthHost !");
  }
});

// Exemple 1 : statut du serveur
app.get('/status', (req, res) => {
  db.query('SELECT COUNT(*) AS count FROM players WHERE connected = 1', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      server: "Nova-Life: Amboise",
      status: "online",
      playersOnline: result[0].count
    });
  });
});

// Exemple 2 : liste des joueurs connectés
app.get('/players', (req, res) => {
  db.query('SELECT name, job FROM players WHERE connected = 1', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`🌍 API NovaLife en ligne sur http://localhost:${port}`);
});