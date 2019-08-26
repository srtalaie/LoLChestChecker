//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

//Intialize Express app
let app = express();

//Set PORT
const PORT = process.env.PORT || 8080

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

//Routes
require("./routes/api-routes.js")(app);
require("./routes/static-routes.js")(app);

//Start Express app 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
