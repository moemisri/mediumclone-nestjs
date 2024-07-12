import { JWT_SECRET } from 'src/config/config';
import { ExpressRequest } from 'src/types/expressRequest.interface';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new UnauthorizedException('Authorization header missing');
      }

      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }

      const decode: any = verify(token, JWT_SECRET);

      if (!decode.id) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.userService.findById(decode.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      req.user = user;
      next();
    } catch (err) {
      req.user = null; // Clear req.user in case of errors
      next(err); // Pass error to NestJS error handling
    }
  }
}
