import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT).then(() => {
    console.clear();
    console.log(`Server is running on http://localhost:${PORT}`);
    
  });
}
bootstrap();
