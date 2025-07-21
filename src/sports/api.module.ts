import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SportmonksService } from './Cricket/modules/API/sportmonks.service';
import { CricketTeamModule } from './Cricket/modules/team/team.module';
import { SoccerTeamModule } from './Soccer/modules/team/team.module';

@Module({
  imports: [HttpModule, SoccerTeamModule,CricketTeamModule],
  providers: [SportmonksService],
  exports: [SportmonksService],
})
export class SportmonksModule {}
