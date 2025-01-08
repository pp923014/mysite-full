import jwt from 'jsonwebtoken';

const isAdmin = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is an admin by using the value from JWT payload
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access Denied: Admins only' });
    }

    req.user = decoded; // Optionally pass user info to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export default isAdmin;
