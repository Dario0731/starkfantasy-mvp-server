import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskTeamService } from './sports/Cricket/modules/job/team-cron.service';

import { CricketMatchModule } from './sports/Cricket/modules/match/match.module';
import { getDatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CricketTeamModule } from './sports/Cricket/modules/team/team.module';
import { CricketPlayerModule } from './sports/Cricket/modules/player/player.module';
import { PlayerPerformanceModule } from './sports/Cricket/modules/playerPerformance/player-performance.module';
import { PoolModule } from './sports/Cricket/modules/pools/pools.module';
import { SportmonksModule } from './sports/api.module';
import { TaskPlayerService } from './sports/Cricket/modules/job/player-cron.service';
import { TaskMatchService } from './sports/Cricket/modules/job/match-cron.service';
import { TaskPlayerPerformance } from './sports/Cricket/modules/job/player-performance-cron.service';
import { SpecialBetModule } from './sports/Cricket/modules/SpecialBets/special-bets.module';
import { PlayerHistoryModule } from './sports/Cricket/modules/PlayerHistorial/player-history.module';
import { TaskPlayerHistory } from './sports/Cricket/modules/job/player-history-cron.service';
import { SoccerPoolModule } from './sports/Cricket/modules/soccer/pool/soccer-pool.module';
import { SoccerSpecialBetModule } from './sports/Cricket/modules/soccer/specialBets/soccer-special-bet.module';
import { SoccerPlayerModule } from './sports/Cricket/modules/soccer/player/soccer-player.module';
import { TaskPoolService } from './sports/Cricket/modules/job/pool-cron.service';
import { SoccerTeamModule } from './sports/Soccer/modules/team/team.module';
import { SoccerMatchModule } from './sports/Soccer/modules/match/match.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    CricketMatchModule,
    CricketTeamModule,
    CricketPlayerModule,
    PlayerPerformanceModule,
    PoolModule,
    SportmonksModule,
    SpecialBetModule,
    PlayerHistoryModule,
    SoccerPoolModule,
    SoccerTeamModule,
    SoccerMatchModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    TaskTeamService,
    TaskPlayerService,
    TaskMatchService,
    TaskPlayerPerformance,
    TaskPlayerHistory,
    TaskPoolService
  ],
})
export class AppModule {}
