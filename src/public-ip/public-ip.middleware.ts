import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PublicIpMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const publicIP = "122.170.24.97";
    // const publicIP = (""+req.headers['x-forwarded-for'] || '').split(',')[0];
    if(!publicIP) {
      res.status(400).send({error: {message: "Invalid Identity "}});
    }

    req.body['CLIENT_PUBLIC_IP'] = publicIP;
    next();
  }
}
