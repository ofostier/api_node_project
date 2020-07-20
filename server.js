/*
var http = require('http');
var handleRequest = function(request, response) {
console.log('Received request for URL: ' + request.url);
response.writeHead(200);
response.end('Hello Medium!');
};
var www = http.createServer(handleRequest);
www.listen(3333);
*/
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3333;

const app = express();

var corsOptions = {
    origin: "http://localhost:3334"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

const db = require("./models");
//db.sequelize.sync({ force: true }).then(() => {
//    console.log("Drop and re-sync db.");
//});

/*
MySQL PART
*/
//const connection = mysql.createConnection({
//    host: 'localhost',
//    user: 'dev1',
//    password: 'dev1',
//    database: 'ofo_dev'
//});

//connection.connect(function(err){
//    (err)? console.log(err): console.log("You are connected to BDD :::");

//});


//require('./routes/html-routes')(app, connection);
require('./routes/api.routes')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
