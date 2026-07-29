import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbPromise from '../config/db.js'
import { ROLES } from '../config/db.js'

export const login = async (req, res) => {
  try {
    const db = await dbPromise;
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIREIN })
    const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIREIN })

    await db.run("UPDATE users SET refreshToken = ? WHERE username = ?", [refreshToken, username]);
    
    return res.status(200).json({ 
      message: 'Login successfully.', 
      accessToken, 
      refreshToken, 
      user: { username: user.username, role: user.role } 
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const db = await dbPromise;
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: "No refresh token provided." });

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid or expired refresh token." });

      const user = await db.get("SELECT * FROM users WHERE username = ?", [decoded.username]);
      if (!user || user.refreshToken !== token) {
        return res.status(403).json({ error: "Invalid refresh token." });
      }

      const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIREIN });
      return res.status(200).json({ accessToken });
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided." })
  
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: "No token provided." })
  
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  })
};

export const verifyAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (role !== ROLES.ADMIN) {
    return res.status(403).json({ error: "Forbidden" })
  }
  next();
}

export const logOut = async (req, res) => {
  try {
    const db = await dbPromise;
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: "No refresh token provided." });

    jwt.verify(token, process.env.REFRESH_SECRET, { ignoreExpiration: true }, async (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid refresh token." });

      await db.run("UPDATE users SET refreshToken = null WHERE username = ?", [decoded.username]);
      return res.status(200).json({ message: 'Logout successfully.' });
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
};