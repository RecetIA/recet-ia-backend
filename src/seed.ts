import { NestFactory } from '@nestjs/core';
import { SeedModule } from './data/seed/seed.module';
import { SeedService } from './data/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seedService = app.get(SeedService);

  await seedService.seed();
  await app.close();
}

bootstrap()
  .then(() => console.log('Seeding completed'))
  .catch((err) => console.error('Seeding failed', err));
