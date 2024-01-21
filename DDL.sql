-- CS 340 Project
-- Group #97: Hayden Burgess, Quynh Nguyen
-- Project Title: Tabletoppers Games

-- Disable commits/foreign key checks 
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Board Games Table 
CREATE TABLE Board_Games (
  board_game_id INT AUTO_INCREMENT,
  board_game_name VARCHAR(255) not NULL,
  board_game_price INT not NULL CHECK (board_game_price >= 1),
  PRIMARY KEY (board_game_id)
);

-- Insert data into Board Games table
INSERT INTO Board_Games (board_game_id, board_game_name, board_game_price)
VALUES (507, 'Wooden Blocks', 13),
(1012, 'Cubic Comets', 17),
(2940, 'Conquest Attack', 24),
(10293, 'Risk It All', 28);

-- Create Customers Table
CREATE TABLE Customers (
  customer_id INT AUTO_INCREMENT not NULL, 
  customer_first_name VARCHAR(255) not NULL, 
  customer_last_name VARCHAR(255) not NULL,
  customer_email VARCHAR(255) not NULL,
  customer_street VARCHAR(255) not NULL,
  customer_state VARCHAR(255) not NULL,
  customer_zipcode VARCHAR(255) not NULL,
  PRIMARY KEY (customer_id)
);

-- Insert data into Customers Table
INSERT INTO Customers (customer_id, customer_first_name, customer_last_name, customer_email, customer_street, customer_state, customer_zipcode)
VALUES (325, 'Ava', 'Mclean', 'avamclean@hotmail.com', '9689 Wild Horse Street Middleton', 'WI', 53562),
(672, 'Michelle', 'Wong', 'michellewong@yahoo.com', '792 Miller Lane Taunton', 'MA', 2780),
(1012, 'Ricky', 'Marks', 'rmarks@gmail.com', '299 Myers Avenue Trussville', 'AL', 35173),
(2573, 'Roman', 'Abbott', 'romana@gmail.com', '816 Bayberry Court Mount Pleasant', 'SC', 29464);

-- Create Orders Table
CREATE TABLE Orders (
  order_id INT AUTO_INCREMENT, 
  customer_id INT not NULL, 
  order_date DATE not NULL,
  shipped_date DATE,
  order_status VARCHAR(255) not NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

-- Insert data into Orders Table
INSERT INTO Orders (order_id, customer_id, order_date, shipped_date, order_status)
VALUES (56, 2573, '2023-02-04', '2023-02-13', 'DELIVERED'),
(940, 1012, '2020-02-10', '2020-02-15', 'AT POST OFFICE'),
(2045, 672, '2019-01-17', '2019-01-19', 'AT POST OFFICE'),
(3092, 325, '2022-09-12', '2022-09-20', 'DELIVERED'),
(8934, 325, '2018-04-05', '2018-04-14', 'DELIVERED');

-- Create Order Details Table
CREATE TABLE Order_Details (
  order_id INT not NULL, 
  board_game_id INT not NULL, 
  quantity_ordered INT not NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (board_game_id) REFERENCES Board_Games(board_game_id) ON DELETE CASCADE
);

-- Insert data into Order Details Table
INSERT INTO Order_Details (order_id, board_game_id, quantity_ordered) 
VALUES (56, 1012, 1),
(56, 507, 1),
(940, 2940, 2),
(2045, 10293, 1),
(3092, 507, 3),
(8394, 2940, 1);

-- Create Warehouses Table
CREATE TABLE Warehouses (
  warehouse_id INT AUTO_INCREMENT not NULL,
  warehouse_location VARCHAR(255) not NULL, 
  board_game_id INT,
  quantity_stock INT,
  PRIMARY KEY (warehouse_id),
  FOREIGN KEY (board_game_id) REFERENCES Board_Games(board_game_id) ON DELETE SET NULL
);

-- Insert data into Warehouses Table
INSERT INTO Warehouses (warehouse_id, warehouse_location, board_game_id, quantity_stock) 
VALUES (29, 'Wichita, Kansas', 507, 237),
(457, 'Hillsboro, Oregon', 1012, 203),
(587, 'Erie, Pennsylvania', 2940, 126),
(1852, 'Methuen, Massachusetts', 10293, 138);


-- Turn on commits/foreign key checks 
SET FOREIGN_KEY_CHECKS=1;
COMMIT;