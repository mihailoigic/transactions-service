import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction } from './transaction.entity';
import { TransactionStatus } from './types/transaction-status.enum';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async filter(filters: {
    category?: string;
    status?: TransactionStatus;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    sortBy?: keyof Transaction;
    order?: 'ASC' | 'DESC';
  }) {
    return this.transactionsRepository.filter(filters);
  }

  async create(data: {
    amount: number;
    date: string;
    category: string;
    status: TransactionStatus;
  }): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(data);
    return this.transactionsRepository.save(transaction);
  }

  async update(
    id: string,
    data: Partial<Omit<Transaction, 'id'>>,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    Object.assign(transaction, data);
    return this.transactionsRepository.save(transaction);
  }

  async delete(id: string): Promise<void> {
    const result = await this.transactionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
  }
}
