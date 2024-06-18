const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

const users = require('../utilisateurs.json');


function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

function getUserByLoginAndPassword(login, password) {
  return users.find(user => user.login === login && user.password === password);
}


exports.login = (req, res) => {
  const { login, password } = req.body;

  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(login) && pattern.test(password)) {
      const utilisateur = getUserByLoginAndPassword(login, password);
      console.log(utilisateur);
      if (utilisateur) {
          const { id, name, firstname, login, email } = utilisateur;
          const user = { id, name, firstname, login, email };
          let accessToken = generateAccessToken(user);
          res.setHeader('Authorization', `Bearer ${accessToken}`);
          console.log(accessToken);
          res.send(utilisateur);
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
  const { name, firstname, email, login, password } = req.body;

  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(login) && pattern.test(password)) {
      const utilisateur = getUserByLoginAndPassword(login, password);
      if (!utilisateur) {
          const user = { id: uuidv4(), name, firstname, email, login, password };
          users.push(user);
          res.status(201).send(user);
      } else {
          res.status(409).send({
              message: "Utilisateur existant"
          });
      }
  } else {
      res.status(400).send({
          message: "Login ou mot de passe invalide"
      });
  }
}


