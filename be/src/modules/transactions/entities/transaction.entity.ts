import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionStatus } from '../types/transaction-status.enum';
import { Category } from 'src/modules/categories/entities/category.entity';

@Entity({ name: 'transactions' })
@Index('UX_TRANSACTIONS_CATEGORY', ['categoryId'])
@Index('UX_TRANSACTIONS_STATUS', ['status'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'enum', enum: TransactionStatus })
  status: TransactionStatus;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
