import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    const publicIP = "122.170.24.97";
    // const publicIP = (""+req.headers['x-forwarded-for'] || '').split(',')[0];
    if(!publicIP) {
      res.status(400).send({error: {message: "Invalid Identity "}});
    }

    req.body['CLIENT_PUBLIC_IP'] = publicIP;
    next();
  }
}
