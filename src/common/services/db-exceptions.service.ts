import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class DbExceptionsService {
  private readonly logger = new Logger(DbExceptionsService.name);

  handleDBExceptions(error: any): void {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    if (error.code === '23503') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected error, check server logs.');
  }
}