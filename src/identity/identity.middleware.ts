import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {

    const ip = req.body['CLIENT_PUBLIC_IP'];
    console.log('Identity Middleware: ', ip);
    next();
  }
}
