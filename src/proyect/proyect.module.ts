import { Module } from '@nestjs/common';
import { ProyectService } from './proyect.service';
import { ProyectController } from './proyect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyect } from './entities/proyect.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { Client } from '../client/entities/client.entity';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proyect, Client]),
    AuthModule,
    CommonModule,
    ClientModule
  ],
  controllers: [ProyectController],
  providers: [ProyectService],
  exports: [TypeOrmModule, ProyectService]
})
export class ProyectModule {}
