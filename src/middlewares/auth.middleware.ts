import * as jwt from 'jsonwebtoken'
import { User } from 'src/interfaces/user.interface'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization

      if (!token) return res.status(401).json({ message: 'No token provided' })

      jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: 'Invalid token' })
        }

        const user = decoded as User

        req.user = user

        next()
      })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
