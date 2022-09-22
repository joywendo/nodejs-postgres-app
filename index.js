// Entry Point of the API Server 
  
const express = require('express');
require("dotenv").config();
  
/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_URL,
    database_name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
});
  
  
/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
  
  
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

app.get('/', async (req, res, next) => {
    res.send("Welcome :)")
})

app.get('/testdata', async (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('Select * from test')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
              })
              .catch(error =>{
                res.send("no data")
              })
})
  
// Require the Routes API  
// Create a Server and run it on the port 5000
const server = app.listen(4000, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Server running ...")
    // Starting the Server at the port 5000
})
            
