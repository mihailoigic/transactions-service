import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionStatus } from './types/transaction-status.enum';

interface FilterOptions {
  category?: string;
  status?: TransactionStatus;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof Transaction;
  order?: 'ASC' | 'DESC';
}

@Injectable()
export class TransactionsRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }

  async filter(options: FilterOptions): Promise<{
    data: Transaction[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      category,
      status,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
      sortBy = 'date',
      order = 'DESC',
    } = options;

    const query = this.createQueryBuilder('transaction');

    if (category) {
      query.andWhere('transaction.category = :category', { category });
    }

    if (status) {
      query.andWhere('transaction.status = :status', { status });
    }

    if (fromDate) {
      query.andWhere('transaction.date >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('transaction.date <= :toDate', { toDate });
    }

    query
      .orderBy(`transaction.${sortBy}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
