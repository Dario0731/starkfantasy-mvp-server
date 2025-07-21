import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoccerTeam } from 'src/Soccer.schema';
import { SoccerTeamRepository } from './repository/team.repository';
import { SoccerTeamService } from './service/team.service';
import { SoccerTeamController } from './controllers/team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SoccerTeam])],
  controllers: [SoccerTeamController],
  providers: [SoccerTeamRepository, SoccerTeamService],
  exports: [SoccerTeamService]
})
export class SoccerTeamModule {}
