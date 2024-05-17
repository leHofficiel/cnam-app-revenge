const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    let router = require("express").Router();
  

    // login utilisateur
    router.post("/login", utilisateur.login);
  
    app.use('/utilisateur', router);
  };
