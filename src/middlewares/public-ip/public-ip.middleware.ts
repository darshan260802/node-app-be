import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PublicIpMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // const publicIP = "122.170.24.97";
    const publicIP = (""+req.headers['x-forwarded-for'] || '').split(',')[0];

    console.log('DUMP: ->', req.headers['x-forwarded-for'], publicIP);
    
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
