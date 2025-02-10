import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IdentityMiddleware } from './middlewares/identity/identity.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.identity';
import { PublicIpMiddleware } from './middlewares/public-ip/public-ip.middleware';
import { Session } from './entities/session.identity';
import { NotesModule } from './notes/notes.module';
import { Note } from './entities/note.identity';

// url: "postgresql://postgres:Darshan#260802@db.ytyhbijqjwogkptqffhb.supabase.co:5432/postgres"
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: 'postgres.jhkhegktmtzjaehfpkbv',
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    entities: [User, Session, Note],
    synchronize: true,
  }), NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PublicIpMiddleware).forRoutes('*');
    consumer.apply(IdentityMiddleware).exclude('user/*path').forRoutes('*');
  }
}
