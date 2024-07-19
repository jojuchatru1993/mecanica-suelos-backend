import { Module } from '@nestjs/common';
import { AggregateTypeService } from './aggregate-type.service';
import { AggregateTypeController } from './aggregate-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { AggregateType } from './entities/aggregate-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AggregateType]),
    AuthModule,
    CommonModule
  ],
  controllers: [AggregateTypeController],
  providers: [AggregateTypeService],
  exports: [TypeOrmModule, AggregateTypeService]
})
export class AggregateTypeModule {}
