import { Module } from '@nestjs/common';
import { StandardService } from './standard.service';
import { StandardController } from './standard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { Standard } from './entities/standard.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Standard]),
    AuthModule,
    CommonModule
  ],
  controllers: [StandardController],
  providers: [StandardService],
  exports: [TypeOrmModule, StandardService]
})
export class StandardModule {}
