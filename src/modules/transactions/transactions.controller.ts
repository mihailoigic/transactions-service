import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';
import { TransactionStatus } from './types/transaction-status.enum';
import { Transaction } from './transaction.entity';

@Controller('transactions')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(
    @Query('category') category?: string,
    @Query('status') status?: TransactionStatus,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('sortBy') sortBy: keyof Transaction = 'date',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.transactionsService.filter({
      category,
      status,
      fromDate,
      toDate,
      page: Number(page),
      limit: Number(limit),
      sortBy,
      order,
    });
  }

  @Post()
  async create(@Body() createDto: CreateTransactionDto) {
    return this.transactionsService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.transactionsService.delete(id);
  }
}
