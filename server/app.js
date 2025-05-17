import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "./authMiddleware.js";
import { getUserByUsername, addUser } from "./myRepository.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse requests with JSON body
app.use(express.static("public")); // folder to serve our static files
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //     --- Dont forget to add JWT_SECRET in .env ---
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .cookie("token", token, {
        httpOnly: true, // Prevents JS access (recommended for security)
        secure: false, // Set to true in production with HTTPS
        sameSite: "lax", // Or "strict" depending on your needs
        maxAge: 3600000, // 1 hour
      })
      .json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error signing in" });
  }
});

app.post("/signout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
  //res.redirect("/welcome.html");
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you have access!` });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
