import 'dotenv/config'; // !!! <---- add JWT_SECRET in .env (see below code)
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  //     --- Dont forget to add JWT_SECRET in .env ---
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

export default authenticateToken;
