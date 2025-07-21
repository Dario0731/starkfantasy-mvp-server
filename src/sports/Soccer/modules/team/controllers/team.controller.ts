import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SoccerTeamService } from '../service/team.service';
import { SoccerTeam } from 'src/Soccer.schema';

@Controller('soccer-team')
export class SoccerTeamController {
  constructor(private readonly teamService: SoccerTeamService) {}

  @Post()
  async create(@Body() teamData: SoccerTeam): Promise<SoccerTeam> {
    return this.teamService.create(teamData);
  }

  @Get()
  async findAll(): Promise<SoccerTeam[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SoccerTeam | null> {
    return this.teamService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() teamData: Partial<SoccerTeam>,
  ): Promise<SoccerTeam> {
    return this.teamService.update(id, teamData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.teamService.delete(id);
  }
}
