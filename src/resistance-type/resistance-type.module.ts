import { Module } from '@nestjs/common';
import { ResistanceTypeService } from './resistance-type.service';
import { ResistanceTypeController } from './resistance-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResistanceType } from './entities/resistance-type.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResistanceType]),
    AuthModule,
    CommonModule
  ],
  controllers: [ResistanceTypeController],
  providers: [ResistanceTypeService],
  exports: [TypeOrmModule, ResistanceTypeService]
})
export class ResistanceTypeModule {}
