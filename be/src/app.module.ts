import { Module } from '@nestjs/common';
import { TypeOrmSetupModule } from './initializers/typeorm-setup.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [TypeOrmSetupModule, TransactionsModule, CategoriesModule],
})
export class AppModule {}
