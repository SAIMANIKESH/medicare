import jwt from 'jsonwebtoken';
import dbPromise from '../models/db.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = await dbPromise;
    
    // Attach user info to req
    db.get('SELECT id, email FROM users WHERE id = ?', [decoded.id], (err, row) => {
      if (err || !row) return res.status(401).json({ error: 'User not found' });

      req.user = { id: row.id, email: row.email };
      next();
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
