# IDATG2204-Project
Semester Project: E-Commerce Website Database Implementation

# Project description
New electronics selling company ElectroMart has hired you as their new database engineer. They offer wide range of electronic products, including smartphones, laptops, tablets, cameras, home appliances, and accessories. The company aims to provide an efficient and user-friendly online shopping experience to it customers. 
 
As a database engineer, you are tasked with designing and implementing a fully functional relational database driven e-commerce website (as a reference you can also visit popular ecommerce websites like Power, Elkjop, Komplett, Zalando, etc). The project involves creating both the basic frontend and backend components of the website, as well as implementing the necessary database structures to support its functionality. 

# Entities:
- Product: Represents the electronic products available for sale on the website. Attributes may include ProductID, Name, Description, Price, StockQuantity, BrandID, CategoryID, and other specifications.
- Category: Represents different categories of electronic products. Attributes may include CategoryID, Name, and Description
- Brand: Represents the brands or manufacturers of electronic products. Attributes may include BrandID ,Name, and Description
- User: Represents users of the website. Attributes may include UserID, Username, Password, Email, FirstName, LastName, Address, and other contact details
- Order: Represents individual orders placed by users. Attributes may include OrderID, UserID, OrderDate, TotalAmount, Status, and other relevant information
- OrderItem: Represents the items included in each order. Attributes may include OrderItemID ,OrderID ,ProductID ,Quantity, and Subtotal
- Payment: Represents payments made for orders. Attributes may include PaymentID, OrderID, PaymentMethod, Amount, PaymentDate, and Status

# Project goals
- Database Design: Design a relational database schema to store information about products, users, orders, payments, and any other relevant entities for the e-commerce website. Create an EER diagram, logical diagram, also create sample tables in 1NF,2NF, 3NF and BCNF for every relation.
- Backend Development: Implement the backend of the website using a suitable programming language and framework (e.g., Python with Django or Flask, Node.js with Express.js, or any of your choice) to handle user authentication, product management, order processing, and other server-side functionalities. You can use programming language/ framework of your choice.
- Frontend Development: Develop the frontend of the website using HTML, CSS, and JavaScript (with frameworks like React, Angular, Vue.js, or any technology of your choice) to create an intuitive user interface for browsing products, adding them to the cart, and completing orders.
- Database Implementation: Implement the designed database schema using a relational database management system (such as MySQL, PostgreSQL, or SQLite) to store and retrieve data efficiently. Implement the concepts learned in the course including primary/foreign/compositive keys, integrity/referential constraints, and others.
- Documentation: Provide comprehensive documentation covering the database schema, backend APIs, frontend components, and instructions for running and testing the website (with screenshots). Choose the primary and foreign keys and mention your assumptions in the report.
