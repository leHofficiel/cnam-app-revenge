const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");
const bcrypt = require('bcryptjs');
const fs = require('fs');

const jwt = require('jsonwebtoken');

const users = require('../utilisateurs.json');


function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

function getUserByLogin(login) {
    return users.find(user => user.login === login);
  }

exports.login = (req, res) => {
    const { login, password } = req.body;

    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(login) && pattern.test(password)) {
      const utilisateur = getUserByLogin(login);
      console.log(utilisateur);
      if (utilisateur) {
        // Compare the provided password with the hashed password
        bcrypt.compare(password, utilisateur.password, (err, result) => {
          if (result) {
            const { id, name, firstname, login, email } = utilisateur;
            const user = { id, name, firstname, login, email };
            let accessToken = generateAccessToken(user);
            res.setHeader('Authorization', `Bearer ${accessToken}`);
            console.log(accessToken);
            res.status(200).json({ accessToken });
            } else {
            res.status(401).send({
              message: "Mot de passe incorrect"
            });
          }
        });
      } else {
        res.status(404).send({
          message: "Utilisateur inexistant"
        });
      }
    } else {
      res.status(400).send({
        message: "Login ou mot de passe invalide"
      });
    }
  };

exports.register = (req, res) => {
  const nouvelUtilisateur  = req.body;

  const utilisateurExistant = users.find(user => user.email === nouvelUtilisateur.email);
  if (utilisateurExistant) {
    return res.status(409).json({ error: "Email déjà utilisé" });
  }

  nouvelUtilisateur.password = bcrypt.hashSync(nouvelUtilisateur.password, 8);

    nouvelUtilisateur.id = uuidv4();
    users.push(nouvelUtilisateur);

    fs.writeFile('./utilisateurs.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error saving users:', err);
            res.status(500).json({ error: "Erreur lors de la sauvegarde des utilisateurs" });
        } else {
            res.json(nouvelUtilisateur);
        }
    });
  }




