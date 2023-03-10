import dotenv from 'dotenv';
import Express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();
const token: string = process.env.TOKEN || '';

export const auth0Middleware = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(req.token, token);
      req.user = decoded;
    } catch (err: unknown) {
      if (err instanceof Error) {
        switch (err.name) {
          case 'TokenExpiredError':
            return res.status(401).send({ message: 'Token expired' });
          case 'JsonWebTokenError':
            return res.status(401).send({ message: 'Token invalid' });
          default:
            return res.status(401).send({ message: 'Unauthorized' });
        }
      }
      if (req.user) {
        return next();
      }
    }
  } else {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  next();
};

export const auth0GenerateSecret = (timeLive: string) => {
  return jwt.sign({ secret: crypto.randomBytes(64).toString('hex') }, token, {
    expiresIn: timeLive,
  });
};
