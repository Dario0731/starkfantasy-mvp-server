import { Injectable } from '@nestjs/common';
import { TaskMatchService } from './sports/Cricket/modules/job/match-cron.service';
import { TaskPlayerService } from './sports/Cricket/modules/job/player-cron.service';
import { TaskPlayerPerformance } from './sports/Cricket/modules/job/player-performance-cron.service';
import { TaskTeamService } from './sports/Cricket/modules/job/team-cron.service';
import { TaskPlayerHistory } from './sports/Cricket/modules/job/player-history-cron.service';

@Injectable()
export class AppService {

  constructor(
    private readonly matchCronService: TaskMatchService,
    private readonly playerCronService: TaskPlayerService,
    private readonly performanceService: TaskPlayerPerformance,
    private readonly teamCronService: TaskTeamService,
    private readonly playerHistoryService: TaskPlayerHistory
  ){}
  async load() {
    await this.teamCronService.updateSeasonTeams();
    await this.playerCronService.UpdatePlayersBySeason();
    await this.matchCronService.updateMatchsForSeason();
    await this.performanceService.getPlayerPerformancesForWeek();
  }

  async loadHistory() {
    await this.playerHistoryService.generatePlayerHistory();

  }

  async loadPerformances() {
    await this.performanceService.getPlayerPerformancesForWeek();

  }

  async deletePerformances() {
    await this.performanceService.deletePlayerPerformances();

  }
}
