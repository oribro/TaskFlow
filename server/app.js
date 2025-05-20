import "./db.js";
import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "./authMiddleware.js";
import { getUserByUsername, addUser, getCollection } from "./myRepository.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Allow cookies
}));

app.use(express.json()); // Middleware to parse requests with JSON body
app.use(express.static("public")); // folder to serve our static files
app.use(cookieParser());

// API Routes
app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, username, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await addUser(
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
      phone
    );
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000,
      })
      .json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error signing in" });
  }
});

app.post("/api/signout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you have access!` });
});

app.get("/api/test", async (req, res) => {
  console.log("Received request to /api/test");
  try {
    console.log("Attempting to get collection...");
    const collection = await getCollection();
    const documents = [];
    for await (const doc of collection.find()) {
      // Convert MongoDB document to plain object and remove _id
      const plainDoc = JSON.parse(JSON.stringify(doc));
      documents.push(plainDoc);
      console.log('Document:', plainDoc);
    }
    console.log("Collection retrieved successfully");
    res.json({ message: "Successfully connected to database", documents });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).json({ message: `Error testing ${err}` });
  }
});

// Add a test route at root to verify server is working
app.get("/", (req, res) => {
  console.log("Received request to root path");
  res.json({ message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
