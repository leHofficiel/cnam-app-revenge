const express = require("express");
const cors = require("cors");

const app  = express ();

const corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-Type, Authorization',
  exposedHeaders:'Authorization'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


require("./routes/catalogue.routes")(app);
require("./routes/utilisateur.routes")(app);



// set port, listen for requests
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



