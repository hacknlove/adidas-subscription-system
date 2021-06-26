import jwt from 'jsonwebtoken';

/**
 * middleware for authentication
 *
 * If the token is ok, it calls next.
 * It sends a 401 otherwise.
 *
 * the subject should be the email, (or admin for those urls without email)
 * the issues whould be the newsletterId, (or none, for those urls without newsletterId)
 */
export default function authentication(req, res, next) {
  const auth = req.query?.jwt
    ?? req.params.token
    ?? req.headers.Authorization?.replace(/^bearer /, '');

  try {
    jwt.verify(auth, process.env.JWT_SECRET, {
      subject: req.params.email ?? 'admin',
      issuer: req.params.newsletterId ?? 'none',
    });
    return next();
  } catch (error) {
    res.status(401).json({ error });
  }
}
