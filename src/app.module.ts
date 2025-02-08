import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IdentityMiddleware } from './identity/identity.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// url: "postgresql://postgres:Darshan#260802@db.ytyhbijqjwogkptqffhb.supabase.co:5432/postgres"
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    entities: [],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdentityMiddleware).forRoutes('*');
  }
}
