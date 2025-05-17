import { Module } from '@nestjs/common';
import { TypeOrmSetupModule } from './initializers/typeorm-setup.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [TypeOrmSetupModule, TransactionsModule],
})
export class AppModule {}
