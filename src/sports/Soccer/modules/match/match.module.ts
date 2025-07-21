import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CricketMatch } from "src/schema";
import { SoccerMatchRepository } from './repository/match.repository';
import { SoccerMatchService } from './service/match.service';
import { SoccerMatchController } from './controllers/match.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CricketMatch])],
  controllers: [SoccerMatchController],
  providers: [SoccerMatchRepository, SoccerMatchService],
    exports: [SoccerMatchService], 
})
export class SoccerMatchModule {}
