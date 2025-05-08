const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db"); 
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save to db
    try {
        await db.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username, hashedPassword]
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
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    //  Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    //  Create JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
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


module.exports = router;