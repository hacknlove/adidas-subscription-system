import jwt from 'jsonwebtoken';

export default function authentication(req, res, next) {
  const auth = req.headers['Authorization'] ?? req.cookies.jwt ?? req.query.jwt;

  try {
    const parsed = jwt.verify(auth.replace(/^bearer /, ''), process.env.JWT_SECRET)
    if (parsed.sub === 'admin' || parsed.sub === req.params?.email ) {
      return next();
    }
    throw new Error('not allowed')  
  } catch (error) {
    res.status(401).json({ notAuthenticated: true, error })
  }
}
