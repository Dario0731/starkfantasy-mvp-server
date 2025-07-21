import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoccerPoolRepository } from './repository/pool.repository';
import { SoccerPoolService } from './service/pool.service';
import { SoccerPoolController } from './controllers/pool.controller';
import { SoccerPool } from 'src/Soccer.schema';

@Module({
  imports: [TypeOrmModule.forFeature([SoccerPool])],
  controllers: [SoccerPoolController],
  providers: [SoccerPoolRepository, SoccerPoolService],
  exports: [SoccerPoolService],
})
export class PoolModule {}
