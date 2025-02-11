import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Session } from 'src/entities/session.identity';
import { DataSource } from 'typeorm';

@Injectable()
export class IdentityMiddleware implements NestMiddleware {

  constructor(@Inject(DataSource) private dataSource: DataSource){}

  async use(req: Request, res: Response, next: () => void) {
    const sessionRepository = this.dataSource.getRepository(Session)
    const ip = req.body['CLIENT_PUBLIC_IP'];

    const session = await sessionRepository.findOne({
      where: {ipToken: ip}
    });

    if(!session) {
      res.status(401).send({error: {message: "Unauthorized"}});
      return;
    }

    req.body['CLIENT_IDENTITY'] = session;


    console.log('Identity Middleware: ', ip, session);
    next();
  }
}
