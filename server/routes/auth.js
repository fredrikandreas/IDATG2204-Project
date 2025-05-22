const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db"); 
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth"); // Adjust the path as necessary

router.post("/register", async (req, res) => {
    const { username, password, email, first_name, last_name, street, city, postal_code, phone_number, date_of_birth } = req.body;

    // Validate input
    if (!username || !password || !email) {
        return res.status(400).json({ message: "Username, password and email are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password,10);
  

    // save to db
    try {
        await db.query(
            'INSERT INTO "user" (username, password_hash, email, first_name, last_name, street, city, postal_code, phone_number, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [username, hashedPassword, email, first_name, last_name, street, city, postal_code, phone_number, date_of_birth ]
        );
        res.status(201).json({ message: "User registered successfully" });
    }catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});



router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //  Validate
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    //  Find user
    const result = await db.query('SELECT * FROM "user" WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    //  Compare passwords
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    //  Create JWT
    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //  Return token
    res.json({ token });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/validate-token", auth, (req, res) => {
  // If middleware passes, token is valid
  res.status(200).json({ 
    valid: true, 
    user: { 
      id: req.user.id,
      username: req.user.username 
    } 
  });
});


module.exports = router;