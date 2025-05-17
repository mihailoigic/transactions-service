import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionStatus } from '../types/transaction-status.enum';

@Entity({ name: 'transactions' })
@Index('UX_TRANSACTIONS_CATEGORY', ['category'])
@Index('UX_TRANSACTIONS_STATUS', ['status'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  category: string;

  @Column({ type: 'enum', enum: TransactionStatus })
  status: TransactionStatus;
}
