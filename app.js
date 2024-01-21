// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// App.js

/*
    SETUP
*/

// Express
var express = require('express');               // We are using the express library for the web server
var app     = express();                        // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 7145;                             // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Board_Games;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
    });    

// BOARD GAMES
// SELECT QUERY
app.get('/board_games', function(req, res)
    {  
        let query1 = "SELECT * FROM Board_Games;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('board_games', {data: rows});            // Render the board_games.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
    });                                                         

// INSERT QUERY
app.post('/add-board-game-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Board_Games (board_game_name, board_game_price) VALUES ('${data.board_game_name}', '${data.board_game_price}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Board_Games;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE QUERY
app.delete('/delete-board-game-ajax/', function(req,res,next){
    let data = req.body;
    let boardGameID = parseInt(data.board_game_id);
    let deleteOrderDetails = `DELETE FROM Order_Details WHERE board_game_id = ?`;
    let deleteBoardGame = `DELETE FROM Board_Games WHERE board_game_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteOrderDetails, [boardGameID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteBoardGame, [boardGameID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

// UPDATE QUERY
app.put('/put-board-game-ajax', function(req,res,next){
    let data = req.body;
  
    let board_game_price = data.board_game_price;
    let board_game_name = data.board_game_name;
  
    let queryUpdatePrice = `UPDATE Board_Games SET board_game_price = ? WHERE Board_Games.board_game_id = ?`;
    let selectBoardGame = `SELECT * FROM Board_Games WHERE board_game_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdatePrice, [board_game_price, board_game_name], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectBoardGame, [board_game_name], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

// CUSTOMERS
// SELECT QUERY
app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";                // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});              // Render the customers.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
    });                                                       

// INSERT QUERY
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customer_first_name, customer_last_name, customer_email, customer_street, customer_state, customer_zipcode) VALUES ('${data.customer_first_name}', '${data.customer_last_name}', '${data.customer_email}', '${data.customer_street}', '${data.customer_state}', '${data.customer_zipcode}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE QUERY
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customer_id);
    let deleteOrder = `DELETE FROM Orders WHERE customer_id = ?`;
    let deleteCustomer = `DELETE FROM Customers WHERE customer_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteOrder, [customerID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

// ORDERS
// SELECT QUERY
app.get('/orders', function(req, res)
    {  
        let query1 = "SELECT * FROM Orders;";                // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('orders', {data: rows});              // Render the customers.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
    });

// INSERT QUERY
app.post('/add-order-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (customer_id, order_date, shipped_date, order_status) VALUES ('${data.customer_id}', '${data.order_date}', '${data.shipped_date}', '${data.order_status}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
    
            query2 = `SELECT * FROM Orders;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE QUERY
app.delete('/delete-order-ajax/', function(req,res,next){
    let data = req.body;
    let orderID = parseInt(data.order_id);
    let deleteOrderDetails = `DELETE FROM Order_Details WHERE order_id = ?`;
    let deleteOrder = `DELETE FROM Orders WHERE order_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteOrderDetails, [orderID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteOrder, [orderID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

// UPDATE QUERY
app.put('/put-order-ajax', function(req,res,next){
    let data = req.body;
  
    let order_status = data.order_status;
    let order_id = data.order_id;
  
    let queryUpdateStatus = `UPDATE Orders SET order_status = ? WHERE Orders.order_id = ?`;
    let selectOrder = `SELECT * FROM Orders WHERE order_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateStatus, [order_status, order_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectOrder, [order_id], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

// ORDER DETAILS
// SELECT QUERY
app.get('/order_details', function(req, res)
    {  
        let query1 = "SELECT * FROM Order_Details;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('order_details', {data: rows});            // Render the board_games.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
    });     

// INSERT QUERY
app.post('/add-order-details-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Order_Details (order_id, board_game_id, quantity_ordered) VALUES ('${data.order_id}', '${data.board_game_id}', '${data.quantity_ordered}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Order_Details;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

/// WAREHOUSES
// SELECT QUERY
app.get('/warehouses', function(req, res)
{  
    let query1 = "SELECT * FROM Warehouses;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('warehouses', {data: rows});             // Render the warehouses.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we received back from the query
});  

// INSERT QUERY
app.post('/add-warehouse-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let board_game_id = parseInt(data.board_game_id);
    if (isNaN(board_game_id))
    {
        board_game_id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Warehouses (warehouse_location, board_game_id, quantity_stock) VALUES ('${data.warehouse_location}', ${data.board_game_id}, '${data.quantity_stock}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (data.board_game_id === 'None') {
            data.board_game_id  = null;
        } else {
            data.board_game_id  = `'${data.board_game_id}'`;
        }

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Warehouses;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE QUERY
app.delete('/delete-warehouse-ajax/', function(req,res,next){
    let data = req.body;
    let warehouseID = parseInt(data.warehouse_id);
    let deleteWarehouse= `DELETE FROM Warehouses WHERE warehouse_id = ?`;
  
          // Run the 1st query
          db.pool.query(deleteWarehouse, [warehouseID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              
  })});

/*
    LISTENER
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});