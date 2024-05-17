const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {

    if (utilisateur.login === "hamza" && utilisateur.password === "test") {
        const uuid = uuidv4 ();
        const utilisateur = {
          nom: "louada",
          prenom: "hamza",
          login: "hamza",
          email : "hamza@gmail.com",
          password : "test",
          id : uuid
        };

        const user = {
          id: utilisateur.id,
          name: utilisateur.nom,
          email: utilisateur.email
        };
      
        
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        console.log (accessToken);

      
        res.send(utilisateur);
      }
    }
    else {
      res.status(404).send({
        message: "Utilisateur inexistant"
      });
    };    
};


