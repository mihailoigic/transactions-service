import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: 5432,
  host: process.env.POSTGRES_HOST || 'localhost',
  username: process.env.POSTGRES_USER || 'developer',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_NAME || 'vcita-integration',
}));
