const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    let router = require("express").Router();
  
    router.post("/login", utilisateur.login);

    router.post("/register", utilisateur.register);
  
    app.use('/utilisateur', router);
  };
