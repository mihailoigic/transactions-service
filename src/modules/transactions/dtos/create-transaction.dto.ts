import {
  IsNumber,
  IsPositive,
  IsDateString,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { TransactionStatus } from '../types/transaction-status.enum';

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;

  @IsDateString({}, { message: 'Date must be in ISO format (YYYY-MM-DD)' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @IsEnum(TransactionStatus, {
    message: 'Status must be either "pending" or "completed"',
  })
  status: TransactionStatus;
}
