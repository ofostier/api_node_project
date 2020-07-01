const mysql = require('mysql2');

module.exports = function(app, connection) {
    app.get('/', function(req, res) {
        //console.log("You pass throught !!");
        //res.send('Hello from simple-react project (Node part 2)');
        connection.query('SELECT * FROM clients', function(err, data) {
            (err)?res.send(err):res.json({clients: data});
            console.log({clients: data});
        });
    });
};

//CREATE TABLE 'simple'
