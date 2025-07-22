import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoccerTeam } from 'src/Soccer.schema';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/team.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SoccerTeam])],
  controllers: [UserController],
  providers: [UserService, UserService],
  exports: [UserService]
})
export class UserModule {}
