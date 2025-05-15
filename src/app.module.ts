import { Module } from '@nestjs/common';
import { TypeOrmSetupModule } from './initializers/typeorm-setup.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmSetupModule, TransactionsModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
})
export class AppModule {}
