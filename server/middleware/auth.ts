import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Auth from '../auth/auth';

const AUTH_ROUTES = ['/message/send'];

const authToken = (req: Request, res: Response, next: NextFunction) => {

    // test la route authorisée sans token
  if (AUTH_ROUTES.some((r) => r === req.url)) {
    next()
    return
  }

  // test le header avec bearer
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.sendStatus(401)

  // test l'existance du token
  const token = authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  // test la validation du token
  jwt.verify(token, Auth.TOKEN, (err, _) => {
    if (err) {
      console.log('ERR : authToken', err)
      return res.sendStatus(403)
    }
    next()
  })
}

export default authToken;