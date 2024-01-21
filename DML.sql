-- CS 340 Project
-- Group #97: Hayden Burgess, Quynh Nguyen
-- Project Title: Tabletoppers Games

--- INSERT 
-- Add new board game
INSERT INTO Board_Games (board_game_name, board_game_price) 
VALUES (:board_game_name_input, :board_game_price_input);
-- Add new customer 
INSERT INTO Customers (customer_first_name, customer_last_name, customer_email, customer_street, customer_state, customer_zipcode) 
VALUES (:customer_first_name_input, :customer_last_name_input, :customer_email_input, :customer_street_input, :customer_state_input, :customer_zipcode_input);
-- Add new order
INSERT INTO Orders (customer_id, order_date, shipped_date, order_status) 
VALUES (:customer_id_input, :order_date_input, :shipped_date_input, :order_status_input);
-- Add new order details 
INSERT INTO Order_Details (order_id, board_game_id, quantity_ordered)
VALUES (:order_id_input, :board_game_id_input, :quantity_ordered_input);
-- Add new warehouse
INSERT INTO Warehouses (warehouse_location, board_game_id, quantity_stock)
VALUES (:warehouse_location_input, :board_game_id, :quantity_stock_input);

--- SELECT
-- display board games 
SELECT * FROM Board_Games;
SELECT * FROM Board_Games WHERE board_game_id = :board_game_id_input
-- display customers 
SELECT * FROM Customers;
SELECT * FROM Customers WHERE customer_id = :customer_id
-- display orders
SELECT * FROM Orders;
SELECT Orders.order_id, CONCAT(Customers.customer_first_name,' ', Customers.customer_last_name) AS customer_name, Orders.order_date, Orders.shipped_date, Orders.order_status FROM Orders
INNER JOIN Customers ON Orders.customer_id = Customers.customer_id;
-- display order details 
SELECT * FROM Order_Details;
SELECT Order_Details.order_id, Board_Games.board_game_name, Order_Details.quantity_ordered FROM Orders_Details
INNER JOIN Order_Details ON Board_Games.board_game_id = Order_Details.board_game_id;
-- display warehouses
SELECT * FROM Warehouses;
SELECT Warehouses.warehouse_id, Warehouses.warehouse_location, Board_Games.board_game_name, Warehouses.quantity_stock FROM Warehouses
INNER JOIN Board_Games ON Warehouses.board_game_id = Board_Games.board_game_id;

--- UPDATE
-- Updates a board game 
UPDATE Board_Games SET board_game_price = :board_game_price_input WHERE Board_Games.board_game_id = :board_game_id_input;
-- Updates a customer
UPDATE Customers 
SET customer_email = :customer_email_input 
WHERE Customers.customer_id = :customer_id_input;
-- Updates a order 
UPDATE Orders
SET customer_id = :customer_id_input, order_date = :order_date_input, shipped_date = :shipped_date_input, order_status = :order_status_input
WHERE order_id = :order_id_input;
-- Update order details 
UPDATE Order_Details 
SET order_id = :order_id_input, board_game_id = :order_id_input
WHERE order_id = :order_id_input AND board_game_id = :board_game_id_input;

--- DELETE
-- Deletes a board game by name
DELETE FROM Board_Games WHERE board_game_id = :board_game_id;
-- Deletes a customer row by ID
DELETE FROM Customers WHERE customer_id = :customer_id_input;
-- Deletes an order by ID 
DELETE FROM Orders WHERE order_id = :order_id_input;
DELETE FROM Orders WHERE customer_id = :customer_id_input;
-- Delete order details by ID, board_game_id
DELETE FROM Order_Details WHERE order_id = :order_id_input;
DELETE FROM Order_Details WHERE board_game_id = :board_game_id;



