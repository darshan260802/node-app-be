import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class PublicIpMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    // const publicIP = "122.170.24.97";
    const publicIP = (""+req.headers['x-forwarded-for'] || '').split(',')[0];

    console.info('DUMP: ->', publicIP, req.headers['user-agent'], req.socket.remoteFamily, req.headers);
    
    if(!publicIP || publicIP === 'undefined') {
      throw new HttpException('Invalid Identity', HttpStatus.UNAUTHORIZED);
    }

    if(!req.body) {
      req.body = {};
    }

    req.body['CLIENT_PUBLIC_IP'] = publicIP;
    next();
  }
}
