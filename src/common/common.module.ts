import { Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';
import { DbExceptionsService } from './services/db-exceptions.service';

@Module({
  controllers: [],
  providers: [PaginationService, DbExceptionsService],
  exports: [PaginationService, DbExceptionsService],
})
export class CommonModule {}
