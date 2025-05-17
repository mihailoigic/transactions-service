import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { TransactionStatus } from '../types/transaction-status.enum';

export class UpdateTransactionDto {
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Amount must be a positive number' })
  amount?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Date must be in ISO format (YYYY-MM-DD)' })
  date?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(TransactionStatus, {
    message: 'Status must be either "pending" or "completed"',
  })
  status?: TransactionStatus;
}
