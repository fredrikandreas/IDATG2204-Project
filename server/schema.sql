CREATE TABLE IF NOT EXISTS Product (
  ProductID INT AUTO_INCREMENT PRIMARY KEY,
  ProductName VARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  StockQuantity INT NOT NULL
);

INSERT INTO Product (ProductName, Price, StockQuantity)
VALUES
  ('Laptop', 999.99, 10),
  ('Phone', 599.99, 15),
  ('Tablet', 399.99, 8);
